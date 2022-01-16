import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../../index';
import * as storeService from '../service/store.service';
import { TenancyModel } from '../../components/tenancy/model/tenancy.model';
import * as tenancyService from '../../components/tenancy/service/tenancy.service';
import { CreatedByType, DeleteActionType, IsNewType } from '../model/base-store.model';

const dbName = 'tenancies';
const sliceName = 'tenancies';

export const createOrUpdateTenancy = createAsyncThunk(
    `${sliceName}/createOrUpdateTenancy`,
    async (tenancy: TenancyModel, thunkAPI) => {
        try {
            const uid = storeService.getUidFromStoreState(thunkAPI);

            if (!tenancy.id) {
                const docRef = await addDoc(collection(db, dbName), {
                    ...tenancy,
                    createdBy: uid,
                } as TenancyModel & CreatedByType);
                await storeService.triggerNotificatorSuccess(thunkAPI, 'Tenancy was created successfully!');

                return {
                    ...tenancy,
                    id: docRef.id,
                    isNew: true,
                } as TenancyModel & IsNewType;
            } else {
                await setDoc(doc(db, dbName, tenancy.id), { ...tenancy }, { merge: true });
                await storeService.triggerNotificatorSuccess(thunkAPI, 'Tenancy was updated successfully!');

                return {
                    ...tenancy,
                    isNew: false,
                } as TenancyModel & IsNewType;
            }
        } catch (e) {
            await storeService.triggerNotificatorError(thunkAPI, 'Error when creating/updating tenancy', e);
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const getTenancies = createAsyncThunk(`${sliceName}/getTenancies`, async (_, thunkAPI) => {
    try {
        const uid = storeService.getUidFromStoreState(thunkAPI);

        const q = storeService.buildGetEntitiesQuery(dbName, uid);
        const querySnapshot = await getDocs(q);

        const data: TenancyModel[] = [];
        querySnapshot.forEach((doc) => {
            const id = doc.id;
            data.push({ ...(doc.data() as TenancyModel), id });
        });

        tenancyService.sortTenanciesByBeginDateDesc(data);
        return data;
    } catch (e) {
        await storeService.triggerNotificatorError(thunkAPI, 'Error when getting tenancies', e);
        return thunkAPI.rejectWithValue(e);
    }
});

export const deleteTenancy = createAsyncThunk(
    `${sliceName}/deleteTenancy`,
    async ({ id, performSilently }: DeleteActionType, thunkAPI) => {
        try {
            await deleteDoc(doc(db, dbName, id));
            if (!performSilently) {
                await storeService.triggerNotificatorSuccess(thunkAPI, 'Tenancy was deleted successfully!');
            }

            return { id };
        } catch (e) {
            await storeService.triggerNotificatorError(thunkAPI, 'Error when deleting tenancy', e);
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const tenanciesSlice = createSlice({
    name: sliceName,
    initialState: [] as TenancyModel[],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            getTenancies.fulfilled,
            (state: TenancyModel[], action: PayloadAction<TenancyModel[]>) => {
                return [...action.payload];
            }
        );
        builder.addCase(
            createOrUpdateTenancy.fulfilled,
            (state: TenancyModel[], action: PayloadAction<TenancyModel & IsNewType>) => {
                if (!action.payload.isNew) {
                    const existingTenancy = state.findIndex((tenancy) => tenancy.id === action.payload.id);
                    state[existingTenancy] = action.payload;
                } else {
                    state.push(action.payload);
                }

                tenancyService.sortTenanciesByBeginDateDesc(state);
            }
        );
        builder.addCase(
            deleteTenancy.fulfilled,
            (state: TenancyModel[], action: PayloadAction<{ id: string }>) => {
                return state.filter((tenancy) => tenancy.id !== action.payload.id);
            }
        );
    },
});
