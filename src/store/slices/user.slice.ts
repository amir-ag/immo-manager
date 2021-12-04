import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    updatePassword,
} from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../index';
import { ProfileFormData } from '../../components/profile/profile.container';
import { AddressModel } from '../../models/address.model';

interface UserState {
    email: string;
    accessToken: string;
    uid: string;
    status: string;
    firstName: string;
    lastName: string;
    address: AddressModel;
}

const initialState: UserState = {
    email: '',
    accessToken: '',
    uid: '',
    status: '',
    firstName: '',
    lastName: '',
    address: {
        addressLine1: '',
        postCode: null,
        city: '',
    },
};

type LoginProps = {
    email: string;
    password: string;
};

type SignupProps = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
};

const dbName = 'users';

export const logout = createAsyncThunk('user/logout', async () => {
    const auth = getAuth();
    return await signOut(auth);
});

export const login = createAsyncThunk('user/login', async ({ email, password }: LoginProps) => {
    const auth = getAuth();
    const login = await signInWithEmailAndPassword(auth, email, password);
    const user = login && auth.currentUser;
    const docRef = user && doc(db, dbName, user.uid);
    const docSnap = docRef && (await getDoc(docRef));

    if (docSnap && docSnap.exists()) {
        return {
            ...login,
            ...docSnap.data(),
        };
    } else {
        console.log('error, no data available');
    }
    return login;
});

export const signup = createAsyncThunk(
    'user/signup',
    async ({ email, password, firstName, lastName }: SignupProps) => {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;
        user &&
            (await setDoc(doc(db, dbName, user.uid), {
                uid: user.uid,
                firstName,
                lastName,
                email: user.email,
            }));
        return {
            ...user,
            firstName,
            lastName,
        };
    }
);

export const update = createAsyncThunk('user/update', async (formData: ProfileFormData) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (formData.image) {
        const storage = getStorage();
        const storageRef = ref(storage, `images/${formData.image.name}`);
        await uploadBytes(storageRef, formData.image).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                user &&
                    updateProfile(user, {
                        photoURL: url,
                    });
            });
        });
    }

    if (formData.newPassword) {
        if (formData.newPassword === formData.newPasswordConfirm) {
            user &&
                updatePassword(user, formData.newPassword)
                    .then(() => {
                        console.log('password update successful');
                    })
                    .catch((error) => {
                        console.log('an error ocurred: ', error);
                    });
        }
    }

    user &&
        (await setDoc(
            doc(db, dbName, user.uid),
            {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: user.email,
                address: { ...formData.address },
            },
            { merge: true }
        ));

    return {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        address: { ...formData.address },
    };
});

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
            state.status = 'success';
            state.email = action.payload.email;
            state.accessToken = action.payload.user.accessToken;
            state.uid = action.payload.uid;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.address = { ...action.payload.address };
        });
        builder.addCase(login.rejected, (state) => {
            state.status = 'failed';
        });
        builder.addCase(signup.fulfilled, (state, action: PayloadAction<any>) => {
            state.status = 'success';
            state.email = action.payload.email;
            state.accessToken = action.payload.accessToken;
            state.uid = action.payload.uid;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
        });
        builder.addCase(signup.rejected, (state) => {
            state.status = 'failed';
        });
        builder.addCase(logout.fulfilled, (state) => {
            state.email = '';
            state.accessToken = '';
            state.uid = '';
            state.status = '';
        });
        builder.addCase(update.fulfilled, (state, action: PayloadAction<any>) => {
            state.email = action.payload.email;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
        });
    },
});

export const selectUser = (state: RootState) => state.user;
