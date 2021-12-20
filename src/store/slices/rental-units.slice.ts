import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addDoc, collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from '../../index';
import { getUidFromStoreState } from '../store-functions';
import { RentalUnitModel } from '../../components/rental-unit/model/rental-unit.model';

const dbName = 'rental-units';

export const createOrUpdateRentalUnit = createAsyncThunk(
    'rental-units/createOrUpdateRentalUnit',
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

export const getRentalUnits = createAsyncThunk('rental-units/getRentalUnits', async (_, thunkAPI) => {
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
        console.error('Error getting rental units: ', e);
    }
});

export const rentalUnitsSlice = createSlice({
    name: 'rental-units',
    initialState: [] as RentalUnitModel[],
    reducers: {},
    extraReducers: (builder) => {
        // TODO: Use strongly typed types
        builder.addCase(getRentalUnits.fulfilled, (state, action: PayloadAction<any>) => {
            // TODO: Use 'state.xxxx = action.payload'
            return [...action.payload];
        });
    },
});
