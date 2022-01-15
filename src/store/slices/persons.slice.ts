import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../../index';
import { PersonModel } from '../../components/person/model/person.model';
import * as storeService from '../service/store.service';
import { CreatedByType, IsNewType } from '../model/base-store.model';
import * as personService from '../../components/person/service/person.service';

const dbName = 'persons';
const sliceName = 'persons';

export const createOrUpdatePerson = createAsyncThunk(
    `${sliceName}/createOrUpdatePerson`,
    async (personData: PersonModel, thunkAPI) => {
        try {
            const uid = storeService.getUidFromStoreState(thunkAPI);

            if (!personData.id) {
                const docRef = await addDoc(collection(db, dbName), {
                    ...personData,
                    createdBy: uid,
                } as PersonModel & CreatedByType);
                await storeService.triggerNotificatorSuccess(thunkAPI, 'Person was created successfully!');

                return {
                    ...personData,
                    id: docRef.id,
                    isNew: true,
                } as PersonModel & IsNewType;
            } else {
                await setDoc(
                    doc(db, dbName, personData.id),
                    {
                        ...personData,
                    },
                    { merge: true }
                );
                await storeService.triggerNotificatorSuccess(thunkAPI, 'Person was updated successfully!');

                return {
                    ...personData,
                    isNew: false,
                } as PersonModel & IsNewType;
            }
        } catch (e) {
            await storeService.triggerNotificatorError(thunkAPI, 'Error when creating/updating person', e);
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const getPersons = createAsyncThunk(`${sliceName}/getPersons`, async (_, thunkAPI) => {
    try {
        const uid = storeService.getUidFromStoreState(thunkAPI);

        const q = storeService.buildGetEntitiesQuery(dbName, uid);
        const querySnapshot = await getDocs(q);

        const data: PersonModel[] = [];
        querySnapshot.forEach((doc) => {
            const id = doc.id;
            data.push({ ...(doc.data() as PersonModel), id });
        });

        personService.sortPersonsByLastAndFirstNameAsc(data);
        return data;
    } catch (e) {
        await storeService.triggerNotificatorError(thunkAPI, 'Error when getting persons', e);
        return thunkAPI.rejectWithValue(e);
    }
});

export const deletePerson = createAsyncThunk(`${sliceName}/deletePerson`, async (id: string, thunkAPI) => {
    try {
        await deleteDoc(doc(db, dbName, id));
        await storeService.triggerNotificatorSuccess(thunkAPI, 'Person was deleted successfully!');

        return { id };
    } catch (e) {
        await storeService.triggerNotificatorError(thunkAPI, 'Error when deleting person', e);
        return thunkAPI.rejectWithValue(e);
    }
});

export const personsSlice = createSlice({
    name: sliceName,
    initialState: [] as PersonModel[],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            getPersons.fulfilled,
            (state: PersonModel[], action: PayloadAction<PersonModel[]>) => {
                return [...action.payload];
            }
        );
        builder.addCase(
            createOrUpdatePerson.fulfilled,
            (state: PersonModel[], action: PayloadAction<PersonModel & IsNewType>) => {
                if (!action.payload.isNew) {
                    const existingPerson = state.findIndex((person) => person.id === action.payload.id);
                    state[existingPerson] = action.payload;
                } else {
                    state.push(action.payload);
                }

                personService.sortPersonsByLastAndFirstNameAsc(state);
            }
        );
        builder.addCase(
            deletePerson.fulfilled,
            (state: PersonModel[], action: PayloadAction<{ id: string }>) => {
                return state.filter((person) => person.id !== action.payload.id);
            }
        );
    },
});
