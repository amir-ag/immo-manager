import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PropertyModel } from '../../components/property/model/property.model';
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../../index';
import * as storeService from '../service/store.service';
import { emptyThumbnail } from '../../models/thumbnail.model';
import { CreatedByType, IsNewType } from '../model/base-store.model';
import * as propertyService from '../../components/property/service/property.service';

const dbName = 'properties';
const sliceName = 'properties';

interface PropertiesState {
    current: PropertyModel | null;
    all: PropertyModel[];
}

export const createOrUpdateProperty = createAsyncThunk(
    `${sliceName}/createOrUpdateProperty`,
    async (property: PropertyModel, thunkAPI) => {
        try {
            const uid = storeService.getUidFromStoreState(thunkAPI);

            let imageUrl;
            if (property.thumbnail?.image) {
                imageUrl = await storeService.uploadImageAndReturnUrl(
                    property.thumbnail?.image,
                    `images/properties/thumbnails/${uid}/${property.thumbnail.image.name}`
                );
            }

            const docToPush = {
                ...property,
                thumbnail: {
                    ...emptyThumbnail,
                    imageUrl: imageUrl ?? property.thumbnail?.imageUrl,
                },
            } as PropertyModel;

            if (!property.id) {
                const docRef = await addDoc(collection(db, dbName), {
                    ...docToPush,
                    createdBy: uid,
                } as PropertyModel & CreatedByType);
                await storeService.triggerNotificatorSuccess(thunkAPI, 'Property was created successfully!');

                return {
                    ...docToPush,
                    id: docRef.id,
                    isNew: true,
                } as PropertyModel & IsNewType;
            } else {
                await setDoc(doc(db, dbName, property.id), docToPush, { merge: true });
                await storeService.triggerNotificatorSuccess(thunkAPI, 'Property was updated successfully!');

                return {
                    ...docToPush,
                    isNew: false,
                } as PropertyModel & IsNewType;
            }
        } catch (e) {
            await storeService.triggerNotificatorError(thunkAPI, 'Error when creating/updating property', e);
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const getProperties = createAsyncThunk(`${sliceName}/getProperties`, async (_, thunkAPI) => {
    try {
        const uid = storeService.getUidFromStoreState(thunkAPI);

        const q = storeService.buildGetEntitiesQuery(dbName, uid);
        const querySnapshot = await getDocs(q);

        const data: PropertyModel[] = [];
        querySnapshot.forEach((doc) => {
            const id = doc.id;
            data.push({ ...(doc.data() as PropertyModel), id });
        });

        propertyService.sortPropertiesByNameAsc(data);
        return data;
    } catch (e) {
        await storeService.triggerNotificatorError(thunkAPI, 'Error when getting properties', e);
        return thunkAPI.rejectWithValue(e);
    }
});

export const deleteProperty = createAsyncThunk(
    `${sliceName}/deleteProperty`,
    async (id: string, thunkAPI) => {
        try {
            await deleteDoc(doc(db, dbName, id));
            await storeService.triggerNotificatorSuccess(thunkAPI, 'Property was deleted successfully!');

            return {
                id,
            };
        } catch (e) {
            await storeService.triggerNotificatorError(thunkAPI, 'Error when deleting property', e);
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const propertiesSlice = createSlice({
    name: sliceName,
    initialState: { current: null, all: [] } as PropertiesState,
    reducers: {
        setCurrentProperty(state: PropertiesState, action: PayloadAction<PropertyModel | null>) {
            let propertyToSet = null;
            if (action.payload) {
                propertyToSet = {
                    ...action.payload,
                    thumbnail: {
                        image: null,
                    },
                } as PropertyModel;
            }
            state.current = propertyToSet;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            getProperties.fulfilled,
            (state: PropertiesState, action: PayloadAction<PropertyModel[]>) => {
                state.all = [...action.payload];
            }
        );
        builder.addCase(
            createOrUpdateProperty.fulfilled,
            (state: PropertiesState, action: PayloadAction<PropertyModel & IsNewType>) => {
                if (!action.payload.isNew) {
                    const existingProperty = state.all.findIndex(
                        (property) => property.id === action.payload.id
                    );
                    state.all[existingProperty] = action.payload;
                } else {
                    state.all.push(action.payload);
                }

                propertyService.sortPropertiesByNameAsc(state.all);
            }
        );
        builder.addCase(
            deleteProperty.fulfilled,
            (state: PropertiesState, action: PayloadAction<{ id: string }>) => {
                state.all = state.all.filter((property) => property.id !== action.payload.id);
            }
        );
    },
});
