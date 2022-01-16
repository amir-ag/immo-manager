import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../../index';
import * as storeService from '../service/store.service';
import { RentalUnitModel } from '../../components/rental-unit/model/rental-unit.model';
import { CreatedByType, DeleteActionType, IsNewType } from '../model/base-store.model';
import * as rentalUnitService from '../../components/rental-unit/service/rental-unit.service';
import { RootState } from '../store';
import * as tenancyService from '../../components/tenancy/service/tenancy.service';
import { deleteTenancy } from './tenancies.slice';

const dbName = 'rental-units';
const sliceName = 'rental-units';

interface RentalUnitsState {
    current: RentalUnitModel | null;
    all: RentalUnitModel[];
}

export const createOrUpdateRentalUnit = createAsyncThunk(
    `${sliceName}/createOrUpdateRentalUnit`,
    async (rentalUnit: RentalUnitModel, thunkAPI) => {
        try {
            const uid = storeService.getUidFromStoreState(thunkAPI);

            if (!rentalUnit.id) {
                const docRef = await addDoc(collection(db, dbName), {
                    ...rentalUnit,
                    createdBy: uid,
                } as RentalUnitModel & CreatedByType);
                await storeService.triggerNotificatorSuccess(
                    thunkAPI,
                    'Rental Unit was created successfully!'
                );

                return {
                    ...rentalUnit,
                    id: docRef.id,
                    isNew: true,
                } as RentalUnitModel & IsNewType;
            } else {
                await setDoc(doc(db, dbName, rentalUnit.id), { ...rentalUnit }, { merge: true });
                await storeService.triggerNotificatorSuccess(
                    thunkAPI,
                    'Rental Unit was updated successfully!'
                );

                return {
                    ...rentalUnit,
                    isNew: false,
                } as RentalUnitModel & IsNewType;
            }
        } catch (e) {
            await storeService.triggerNotificatorError(
                thunkAPI,
                'Error when creating/updating rental unit',
                e
            );
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const getRentalUnits = createAsyncThunk(`${sliceName}/getRentalUnits`, async (_, thunkAPI) => {
    try {
        const uid = storeService.getUidFromStoreState(thunkAPI);

        const q = storeService.buildGetEntitiesQuery(dbName, uid);
        const querySnapshot = await getDocs(q);

        const data: RentalUnitModel[] = [];
        querySnapshot.forEach((doc) => {
            const id = doc.id;
            data.push({ ...(doc.data() as RentalUnitModel), id });
        });

        rentalUnitService.sortRentalUnitsByFloorLevelAsc(data);
        return data;
    } catch (e) {
        await storeService.triggerNotificatorError(thunkAPI, 'Error when getting rental units', e);
        return thunkAPI.rejectWithValue(e);
    }
});

export const deleteRentalUnit = createAsyncThunk(
    `${sliceName}/deleteRentalUnit`,
    async ({ id, performSilently }: DeleteActionType, thunkAPI) => {
        try {
            await deleteDoc(doc(db, dbName, id));

            // Also delete linked tenancies
            const state = thunkAPI.getState() as RootState;
            const allTenancies = state?.tenancies;
            for (const ten of tenancyService.getTenanciesByRentalUnitId(id, allTenancies)) {
                await thunkAPI.dispatch(deleteTenancy({ id: ten.id, performSilently: true }));
            }

            if (!performSilently) {
                await storeService.triggerNotificatorSuccess(
                    thunkAPI,
                    'Rental Unit (and all linked Tenancies) was deleted successfully!'
                );
            }

            return { id };
        } catch (e) {
            await storeService.triggerNotificatorError(thunkAPI, 'Error when deleting rental unit', e);
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const rentalUnitsSlice = createSlice({
    name: sliceName,
    initialState: { current: null, all: [] } as RentalUnitsState,
    reducers: {
        setCurrentRentalUnit(state: RentalUnitsState, action: PayloadAction<RentalUnitModel | null>) {
            state.current = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            getRentalUnits.fulfilled,
            (state: RentalUnitsState, action: PayloadAction<RentalUnitModel[]>) => {
                state.all = [...action.payload];
            }
        );
        builder.addCase(
            createOrUpdateRentalUnit.fulfilled,
            (state: RentalUnitsState, action: PayloadAction<RentalUnitModel & IsNewType>) => {
                if (!action.payload.isNew) {
                    const existingRU = state.all.findIndex((ru) => ru.id === action.payload.id);
                    state.all[existingRU] = action.payload;
                } else {
                    state.all.push(action.payload);
                }

                rentalUnitService.sortRentalUnitsByFloorLevelAsc(state.all);
            }
        );
        builder.addCase(
            deleteRentalUnit.fulfilled,
            (state: RentalUnitsState, action: PayloadAction<{ id: string }>) => {
                state.all = state.all.filter((ru) => ru.id !== action.payload.id);
            }
        );
    },
});
