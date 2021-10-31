import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../index';
import { PersonType } from '../components/ContentTable/ContentTable';

interface PersonData {
    firstName: string;
    lastName: string;
    birthday: string | null;
    street: string;
    houseNumber: string;
    zip: number | null;
    city: string;
    email: string;
    mobilePhone: number | null;
    landline: number | null;
    role: string;
    type: string;
    id?: string;
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
        await deleteDoc(doc(db, 'people', `${id}`));
        return thunkAPI.getState();
    } catch (e) {
        console.error('Error deleting document: ', e);
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
        builder.addCase(deletePerson.fulfilled, (state, action: any) => {
            // TODO maybe find a better solution to update the state after person has been deleted?
            const removePersonId = action.meta.arg;
            return action.payload.persons.filter((person: PersonData) => person.id !== removePersonId);
        });
    },
});

export const selectPersons = (state: RootState) => state.persons;
