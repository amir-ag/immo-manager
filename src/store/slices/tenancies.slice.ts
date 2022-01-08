import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addDoc, collection, deleteDoc, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from '../../index';
import * as storeService from '../service/store.service';
import { TenancyModel } from '../../components/tenancy/model/tenancy.model';
import { tenanciesDescComparer } from '../../components/tenancy/service/tenancy.service';

const dbName = 'tenancies';
const sliceName = 'tenancies';

export const createOrUpdateTenancy = createAsyncThunk(
    `${sliceName}/createOrUpdateTenancy`,
    async (tenancy: TenancyModel, thunkAPI) => {
        try {
            const uid = storeService.getUidFromStoreState(thunkAPI);

            if (!tenancy.id) {
                // TODO: Use typed method and create interface with 'createdBy' field
                const docRef = await addDoc(collection(db, dbName), {
                    ...tenancy,
                    createdBy: uid,
                });
                console.log(`A new tenancy with id=${docRef.id} has been created!`);
                return {
                    ...tenancy,
                    createdBy: uid,
                    id: docRef.id,
                    isNew: true,
                };
            } else {
                // TODO: Use typed method and create interface with 'createdBy' field
                await setDoc(doc(db, dbName, tenancy.id), {
                    ...tenancy,
                    createdBy: uid,
                });
                return {
                    ...tenancy,
                    createdBy: uid,
                };
            }
        } catch (e) {
            console.error('Error when adding/updating tenancy: ', e);
        }
    }
);

export const getTenancies = createAsyncThunk(`${sliceName}/getTenancies`, async (_, thunkAPI) => {
    try {
        const uid = storeService.getUidFromStoreState(thunkAPI);

        const q = query(collection(db, dbName), where('createdBy', '==', uid));
        const querySnapshot = await getDocs(q);

        const data: TenancyModel[] = [];
        querySnapshot.forEach((doc) => {
            const id = doc.id;
            data.push({ ...(doc.data() as TenancyModel), id });
        });

        return data.sort(tenanciesDescComparer);
    } catch (e) {
        console.error('Error getting tenancies: ', e);
    }
});

export const deleteTenancy = createAsyncThunk(`${sliceName}/deleteTenancy`, async (id: string) => {
    try {
        await deleteDoc(doc(db, dbName, `${id}`));
        return { id };
    } catch (e) {
        console.error('Error deleting tenancy: ', e);
    }
});

export const tenanciesSlice = createSlice({
    name: sliceName,
    initialState: [] as TenancyModel[],
    reducers: {},
    extraReducers: (builder) => {
        // TODO: Use strongly typed types
        builder.addCase(getTenancies.fulfilled, (state: TenancyModel[], action: PayloadAction<any>) => {
            return [...action.payload];
        });
        builder.addCase(
            createOrUpdateTenancy.fulfilled,
            (state: TenancyModel[], action: PayloadAction<any>) => {
                if (!action.payload.isNew) {
                    const existingTenancy = state.findIndex((tenancy) => tenancy.id === action.payload.id);
                    state[existingTenancy] = action.payload;
                } else {
                    state.push(action.payload);
                }
            }
        );
        builder.addCase(deleteTenancy.fulfilled, (state: TenancyModel[], action: PayloadAction<any>) => {
            return state.filter((tenancy) => tenancy.id !== action.payload.id);
        });
    },
});
