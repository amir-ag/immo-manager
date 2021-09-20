import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from '../store/store'
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    updateProfile
} from "firebase/auth";

interface UserState {
    email: string | null,
    accessToken: string | null,
    uid: string | null,
    status: string,
    displayName: string | null,

}

const initialState: UserState = {
    email: null,
    accessToken: null,
    uid: null,
    status: '',
    displayName: null
}

type LoginProps = {
    email: string,
    password: string,
}

type SignupProps = {
    email: string,
    password: string,
    firstName: string,
    lastName: string
}

export const logout = createAsyncThunk(
    "user/logout",
    async () => {
        const auth = getAuth();
        return await signOut(auth)
    }
);

export const login = createAsyncThunk(
    "user/login",
    async ({email, password}: LoginProps, thunkAPI) => {
        const auth = getAuth();
        return await signInWithEmailAndPassword(auth, email, password)
    }
);

export const signup = createAsyncThunk(
    "user/signup",
    async ({email, password, firstName, lastName}: SignupProps, thunkAPI) => {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password)
        const user = auth.currentUser
        user && await updateProfile(user, {displayName: firstName})
        // implement another firebase call to add a user profile to firestore tied to the uid
        return user
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
            state.status = 'success';
            state.email = action.payload.user.email
            state.accessToken = action.payload.user.stsTokenManager.accessToken
            state.uid = action.payload.user.uid
        })
        builder.addCase(login.rejected, (state) => {
            state.status = 'failed';
        })
        builder.addCase(signup.fulfilled, (state, action: PayloadAction<any>) => {
            state.status = 'success';
            state.email = action.payload.email;
            state.accessToken = action.payload.accessToken;
            state.uid = action.payload.uid;
            state.displayName = action.payload.displayName;
        })
        builder.addCase(signup.rejected, (state) => {
            state.status = 'failed';
        })
        builder.addCase(logout.fulfilled, (state) => {
            state.email = null
            state.accessToken = null
            state.uid = null
            state.status = ''
        })
    },
})

export const selectUser = (state: RootState) => state.user
// export default userSlice.reducer
