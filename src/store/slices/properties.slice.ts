import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PropertyModel } from '../../components/property/model/property.model';
import { addDoc, collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from '../../index';
import { getUidFromStoreState } from '../store-functions';

const dbName = 'properties';

export const createOrUpdateProperty = createAsyncThunk(
    'properties/createOrUpdateProperty',
    async (property: PropertyModel, thunkAPI) => {
        try {
            const uid = getUidFromStoreState(thunkAPI);

            if (!property.id) {
                // TODO: Use typed method and create interface with 'createdBy' field
                const docRef = await addDoc(collection(db, dbName), {
                    ...property,
                    createdBy: uid,
                });
                console.log(`A new property with id=${docRef.id} has been created!`);
                return docRef;
            } else {
                // TODO: Use typed method and create interface with 'createdBy' field
                await setDoc(doc(db, dbName, property.id), {
                    ...property,
                    createdBy: uid,
                });
            }
        } catch (e) {
            console.error('Error when adding/updating property: ', e);
        }
    }
);

export const getProperties = createAsyncThunk('properties/getProperties', async (_, thunkAPI) => {
    try {
        const uid = getUidFromStoreState(thunkAPI);
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

interface PropertiesState {
    current: PropertyModel | null;
    all: PropertyModel[];
}

export const propertiesSlice = createSlice({
    name: 'properties',
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
