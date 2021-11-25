import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../index';
import { PersonModel } from '../../components/persons/models/person.model';

interface PersonData {
    company: string;
    firstName: string;
    lastName: string;
    birthday: string | null;
    street: string;
    houseNumber: number | null;
    zip: number | null;
    city: string;
    email: string;
    mobilePhone: number | null;
    landline: number | null;
    role: string;
    id?: string;
}

const dbName = 'persons';

export const createPerson = createAsyncThunk('persons/create', async (personData: PersonData, thunkAPI) => {
    try {
        const state = thunkAPI.getState() as RootState;
        const uid = state?.user?.uid;
        const docRef = await addDoc(collection(db, dbName), {
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
        const q = query(collection(db, dbName), where('createdBy', '==', uid));
        const querySnapshot = await getDocs(q);
        const data: any[] = [];
        querySnapshot.forEach((doc) => {
            const id = { id: doc.id };
            data.push({ ...doc.data(), ...id });
        });
        return data;
    } catch (e) {
        console.error('Error getting documents: ', e);
    }
});

export const deletePerson = createAsyncThunk('persons/deletePerson', async (id: string, thunkAPI) => {
    try {
        await deleteDoc(doc(db, dbName, `${id}`));
        return thunkAPI.getState();
    } catch (e) {
        console.error('Error deleting document: ', e);
    }
});

export const personsSlice = createSlice({
    name: 'persons',
    initialState: [] as PersonModel[],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPersons.fulfilled, (state, action: PayloadAction<any>) => {
            return [...action.payload];
        });
        builder.addCase(deletePerson.fulfilled, (state, action: any) => {
            // TODO maybe find a better solution to update the state after person has been deleted?
            const removePersonId = action.meta.arg;
            return action.payload.persons.filter((person: PersonData) => person.id !== removePersonId);
        });
    },
});

export const selectPersons = (state: RootState) => state.persons;
