import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from '../store/store'
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";

interface UserState {
    email: string | null,
    accessToken: string | null,
    uid: string | null,
    status: string
}

const initialState: UserState = {
    email: null,
    accessToken: null,
    uid: null,
    status: ''
}

type PayloadProps = {
    email: string,
    password: string,
}

export const login = createAsyncThunk(
    "user/login",
    async ({email, password}: PayloadProps, thunkAPI) => {
        const auth = getAuth();
        return await signInWithEmailAndPassword(auth, email, password)
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
            state.status = 'success';
            state.email = action.payload.user.email
            state.accessToken = action.payload.user.stsTokenManager.accessToken
            state.uid = action.payload.user.uid
        })
        builder.addCase(login.rejected, (state) => {
            state.status = 'failed';
        })
    },
})

export const selectUser = (state: RootState) => state.user
// export default userSlice.reducer
