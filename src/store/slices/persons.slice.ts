import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { addDoc, collection, deleteDoc, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from '../../index';
import { PersonModel } from '../../components/persons/models/person.model';

const dbName = 'persons';

export const createPerson = createAsyncThunk(
    'persons/createPerson',
    async (personData: PersonModel, thunkAPI) => {
        try {
            // TODO: Use method getUidFromStoreState()
            const state = thunkAPI.getState() as RootState;
            const uid = state?.user?.uid;

            if (!personData.id) {
                const docRef = await addDoc(collection(db, dbName), {
                    ...personData,
                    createdBy: uid,
                });
                console.log('Document written with ID: ', docRef.id);
            }
            return {
                ...personData,
                createdBy: uid,
            };
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    }
);

export const updatePerson = createAsyncThunk(
    'persons/updatePerson',
    async (personData: PersonModel, thunkAPI) => {
        try {
            // TODO: Use method getUidFromStoreState()
            const state = thunkAPI.getState() as RootState;
            const uid = state?.user?.uid;

            await setDoc(
                doc(db, dbName, personData.id),
                {
                    ...personData,
                    createdBy: uid,
                },
                { merge: true }
            );
            return {
                ...personData,
                createdBy: uid,
            };
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    }
);

export const getPersons = createAsyncThunk('persons/getPersons', async (_, thunkAPI) => {
    try {
        // TODO: Use method getUidFromStoreState()
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
        builder.addCase(createPerson.fulfilled, (state, action: PayloadAction<any>) => {
            state.push(action.payload);
        });
        builder.addCase(updatePerson.fulfilled, (state, action: PayloadAction<any>) => {
            const existingPerson = state.findIndex((person) => person.id === action.payload.id);
            state[existingPerson] = action.payload;
        });
        builder.addCase(deletePerson.fulfilled, (state, action: any) => {
            // TODO maybe find a better solution to update the state after person has been deleted?
            const removePersonId = action.meta.arg;
            return action.payload.persons.filter((person: PersonModel) => person.id !== removePersonId);
        });
    },
});
