import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store/store";
import { collection, addDoc } from "firebase/firestore";
import {db} from "../index";

interface PersonData {
    firstName: string,
    lastName: string,
    birthday?: string,
    street: string,
    houseNumber: string,
    zip: number | null,
    city: string,
    email: string,
    mobilePhone: number | null,
    landline?: number | null,
    role: string,
    type: string
}

const initialState: PersonData = {
    firstName: "",
    lastName: "",
    birthday: "",
    street: "",
    houseNumber: "",
    zip: null,
    city: "",
    email: "",
    mobilePhone: null,
    landline: null,
    role: "",
    type: ""
}

export const createPerson = createAsyncThunk(
    "people/create",
    async (personData: PersonData, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as RootState
            const uid = state?.user?.uid
            const docRef = await addDoc(collection(db, "people"), {
                ...personData,
                createdBy: uid
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
);

export const peopleSlice = createSlice({
    name: 'people',
    initialState,
    reducers: {},
    extraReducers: {}
})

// export const selectUser = (state: RootState) => state.user
