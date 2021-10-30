import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../index';
import { PersonType } from '../components/ContentTable/ContentTable';

interface PersonData {
    firstName: string;
    lastName: string;
    birthday?: string;
    street: string;
    houseNumber: string;
    zip: number | null;
    city: string;
    email: string;
    mobilePhone: number | null;
    landline?: number | null;
    role: string;
    type: string;
}

export const createPerson = createAsyncThunk('persons/create', async (personData: PersonData, thunkAPI) => {
    try {
        const state = thunkAPI.getState() as RootState;
        const uid = state?.user?.uid;
        const docRef = await addDoc(collection(db, 'people'), {
            ...personData,
            createdBy: uid,
        });
        console.log('Document written with ID: ', docRef.id);
        return docRef;
    } catch (e) {
        console.error('Error adding document: ', e);
    }
});

export const getPersons = createAsyncThunk('persons/getPersons', async (_, thunkAPI) => {
    try {
        const state = thunkAPI.getState() as RootState;
        const uid = state?.user?.uid;
        const q = query(collection(db, 'people'), where('createdBy', '==', uid));
        const querySnapshot = await getDocs(q);
        const data: any[] = [];
        querySnapshot.forEach((doc) => {
            data.push(doc.data());
        });
        return data;
    } catch (e) {
        console.error('Error getting documents: ', e);
    }
});

export const personsSlice = createSlice({
    name: 'persons',
    initialState: [] as PersonType[],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPersons.fulfilled, (state, action: PayloadAction<any>) => {
            return [...action.payload];
        });
    },
});

export const selectPersons = (state: RootState) => state.persons;
