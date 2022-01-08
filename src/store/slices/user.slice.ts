import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    createUserWithEmailAndPassword,
    getAuth,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    updatePassword,
    updateProfile,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../index';
import { AddressModel } from '../../models/address.model';
import * as storeService from '../service/store.service';
import { UserModel } from '../../components/profile/model/user.model';

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

export const restoreLogin = createAsyncThunk('user/restoreLogin', async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const docRef = user && doc(db, dbName, user.uid);
    const docSnap = docRef && (await getDoc(docRef));

    if (user && docSnap && docSnap.exists()) {
        return {
            ...user,
            ...docSnap.data(),
        };
    }
});

export const resetPassword = createAsyncThunk('user/resetPassword', async (email: string) => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
        .then(() => {
            console.log('reset pw email sent');
        })
        .catch((error) => {
            throw new Error(error);
        });
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

export const update = createAsyncThunk('user/update', async (formData: UserModel) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (formData.thumbnail?.image && user) {
        const photoUrl = await storeService.uploadImageAndReturnUrl(
            formData.thumbnail.image,
            `images/users/thumbnails/${user.uid}/${formData.thumbnail.image.name}`
        );
        await updateProfile(user, {
            photoURL: photoUrl,
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
            return action.payload;
        });
        builder.addCase(login.rejected, (state) => {
            state.status = 'failed';
        });
        builder.addCase(restoreLogin.fulfilled, (state, action: PayloadAction<any>) => {
            return action.payload;
        });
        builder.addCase(signup.fulfilled, (state, action: PayloadAction<any>) => {
            return action.payload;
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
            return action.payload;
        });
    },
});
