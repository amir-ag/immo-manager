import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addDoc, collection, deleteDoc, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from '../../index';
import { getUidFromStoreState } from '../store-functions';
import { rentalUnitfloorLevel, RentalUnitModel } from '../../components/rental-unit/model/rental-unit.model';

const dbName = 'rental-units';
const sliceName = 'rental-units';

export const createOrUpdateRentalUnit = createAsyncThunk(
    `${sliceName}/createOrUpdateRentalUnit`,
    async (rentalUnit: RentalUnitModel, thunkAPI) => {
        try {
            const uid = getUidFromStoreState(thunkAPI);

            if (!rentalUnit.id) {
                // TODO: Use typed method and create interface with 'createdBy' field
                const docRef = await addDoc(collection(db, dbName), {
                    ...rentalUnit,
                    createdBy: uid,
                });
                console.log(`A new rental unit with id=${docRef.id} has been created!`);
                return docRef;
            } else {
                // TODO: Use typed method and create interface with 'createdBy' field
                await setDoc(doc(db, dbName, rentalUnit.id), {
                    ...rentalUnit,
                    createdBy: uid,
                });
            }
        } catch (e) {
            console.error('Error when adding/updating rental unit: ', e);
        }
    }
);

export const getRentalUnits = createAsyncThunk(`${sliceName}/getRentalUnits`, async (_, thunkAPI) => {
    try {
        const uid = getUidFromStoreState(thunkAPI);

        const q = query(collection(db, dbName), where('createdBy', '==', uid));
        const querySnapshot = await getDocs(q);

        const data: RentalUnitModel[] = [];
        querySnapshot.forEach((doc) => {
            const id = doc.id;
            data.push({ ...(doc.data() as RentalUnitModel), id });
        });

        return data.sort((ruA: RentalUnitModel, ruB: RentalUnitModel) => {
            const indexA = rentalUnitfloorLevel.indexOf(!ruA.floorLevel ? 'Undefined' : ruA.floorLevel);
            const indexB = rentalUnitfloorLevel.indexOf(!ruB.floorLevel ? 'Undefined' : ruB.floorLevel);

            return indexA - indexB;
        });
    } catch (e) {
        console.error('Error getting rental units: ', e);
    }
});

export const deleteRentalUnit = createAsyncThunk(
    `${sliceName}/deleteRentalUnit`,
    async (id: string, thunkAPI) => {
        try {
            await deleteDoc(doc(db, dbName, `${id}`));
            return thunkAPI.getState();
        } catch (e) {
            console.error('Error deleting rental unit: ', e);
        }
    }
);

interface RentalUnitsState {
    current?: RentalUnitModel | null;
    all: RentalUnitModel[];
}

export const rentalUnitsSlice = createSlice({
    name: sliceName,
    initialState: { current: null, all: [] } as RentalUnitsState,
    reducers: {
        setCurrentRentalUnit(state: RentalUnitsState, action: PayloadAction<RentalUnitModel | null>) {
            state.current = action.payload;
        },
    },
    extraReducers: (builder) => {
        // TODO: Use strongly typed types
        builder.addCase(getRentalUnits.fulfilled, (state: RentalUnitsState, action: PayloadAction<any>) => {
            state.all = [...action.payload];
        });
    },
});
