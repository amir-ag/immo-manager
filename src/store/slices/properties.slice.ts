import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PropertyModel } from '../../components/property/model/property.model';
import { addDoc, collection, deleteDoc, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from '../../index';
// TODO: Apply this service patterns everywhere
import * as storeService from '../store-functions';

const dbName = 'properties';
const sliceName = 'properties';

export const createOrUpdateProperty = createAsyncThunk(
    `${sliceName}/createOrUpdateProperty`,
    async (property: PropertyModel, thunkAPI) => {
        try {
            const uid = storeService.getUidFromStoreState(thunkAPI);
            const docToPush = {
                ...property,
                thumbnail: {
                    imageUrl: '',
                },
                createdBy: uid,
            };

            if (property.thumbnail?.image) {
                docToPush.thumbnail.imageUrl = await storeService.uploadImageAndReturnUrl(
                    property.thumbnail?.image,
                    `images/properties/thumbnails/${uid}/${property.thumbnail.image.name}`
                );
            }

            if (!property.id) {
                // TODO: Use typed method and create interface with 'createdBy' field
                const docRef = await addDoc(collection(db, dbName), docToPush);
                console.log(`A new property with id=${docRef.id} has been created!`);
                return docRef;
            } else {
                // TODO: Use typed method and create interface with 'createdBy' field
                await setDoc(doc(db, dbName, property.id), docToPush);
            }
        } catch (e) {
            console.error('Error when adding/updating property: ', e);
        }
    }
);

export const getProperties = createAsyncThunk(`${sliceName}/getProperties`, async (_, thunkAPI) => {
    try {
        const uid = storeService.getUidFromStoreState(thunkAPI);
        const q = query(collection(db, dbName), where('createdBy', '==', uid));
        const querySnapshot = await getDocs(q);
        // TODO: Get create typed array
        const data: any[] = [];
        querySnapshot.forEach((doc) => {
            const id = doc.id;
            data.push({ ...doc.data(), id });
        });
        return data;
    } catch (e) {
        console.error('Error getting properties: ', e);
    }
});

export const deleteProperty = createAsyncThunk(
    `${sliceName}/deleteProperty`,
    async (id: string, thunkAPI) => {
        try {
            await deleteDoc(doc(db, dbName, `${id}`));
            return thunkAPI.getState();
        } catch (e) {
            console.error('Error deleting property: ', e);
        }
    }
);

interface PropertiesState {
    current: PropertyModel | null;
    all: PropertyModel[];
}

export const propertiesSlice = createSlice({
    name: sliceName,
    initialState: { current: null, all: [] } as PropertiesState,
    reducers: {
        setCurrentProperty(state: PropertiesState, action: PayloadAction<PropertyModel | null>) {
            state.current = action.payload;
        },
    },
    extraReducers: (builder) => {
        // TODO: Use strongly typed types
        builder.addCase(getProperties.fulfilled, (state: PropertiesState, action: PayloadAction<any>) => {
            state.all = [...action.payload];
        });
    },
});
