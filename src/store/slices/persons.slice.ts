import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addDoc, collection, deleteDoc, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from '../../index';
import { PersonModel } from '../../components/persons/models/person.model';
import * as storeService from '../store-functions';

const dbName = 'persons';
const sliceName = 'tenancies';

export const createUpdatePerson = createAsyncThunk(
    `${sliceName}/createUpdate`,
    async (personData: PersonModel, thunkAPI) => {
        try {
            const uid = storeService.getUidFromStoreState(thunkAPI);

            if (!personData.id) {
                const docRef = await addDoc(collection(db, dbName), {
                    ...personData,
                    createdBy: uid,
                });
                console.log('Document written with ID: ', docRef.id);
                return docRef;
            }

            await setDoc(
                doc(db, dbName, personData.id),
                {
                    ...personData,
                    createdBy: uid,
                },
                { merge: true }
            );
        } catch (e) {
            console.error('Error adding person: ', e);
        }
    }
);

export const getPersons = createAsyncThunk(`${sliceName}/getPersons`, async (_, thunkAPI) => {
    try {
        const uid = storeService.getUidFromStoreState(thunkAPI);

        const q = query(collection(db, dbName), where('createdBy', '==', uid));
        const querySnapshot = await getDocs(q);

        const data: PersonModel[] = [];
        querySnapshot.forEach((doc) => {
            const id = { id: doc.id };
            data.push({ ...(doc.data() as PersonModel), ...id });
        });

        return data.sort((persA: PersonModel, persB: PersonModel) =>
            persA.lastName.localeCompare(persB.lastName)
        );
    } catch (e) {
        console.error('Error getting persons: ', e);
    }
});

export const deletePerson = createAsyncThunk(`${sliceName}/deletePerson`, async (id: string, thunkAPI) => {
    try {
        await deleteDoc(doc(db, dbName, `${id}`));
        return thunkAPI.getState();
    } catch (e) {
        console.error('Error deleting person: ', e);
    }
});

export const personsSlice = createSlice({
    name: sliceName,
    initialState: [] as PersonModel[],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPersons.fulfilled, (state, action: PayloadAction<any>) => {
            return [...action.payload];
        });
        builder.addCase(deletePerson.fulfilled, (state, action: any) => {
            // TODO Rework!
            const removePersonId = action.meta.arg;
            return action.payload.persons.filter((person: PersonModel) => person.id !== removePersonId);
        });
    },
});
