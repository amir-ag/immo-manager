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
import * as storeService from '../service/store.service';
import { emptyUser, UserModel } from '../../models/user.model';
import { LoginModel } from '../../components/home/login/model/login.model';
import { ResetPwModel } from '../../components/home/reset-password/model/reset-password.model';
import { SignUpModel } from '../../components/home/sign-up/model/sign-up.model';
import { ProfileModel } from '../../components/profile/model/profile.model';
import { minPasswordLength } from '../../constants';
import { AddressModel } from '../../models/address.model';

interface UserState extends UserModel {}

const dbName = 'users';
const sliceName = 'user';

export const logout = createAsyncThunk(`${sliceName}/logout`, async (_, thunkAPI) => {
    try {
        const auth = getAuth();
        await signOut(auth);
        await storeService.triggerNotificatorSuccess(thunkAPI, 'Sign-Out successful!');

        return;
    } catch (e) {
        await storeService.triggerNotificatorError(thunkAPI, 'Error when logging out', e);
        return thunkAPI.rejectWithValue(storeService.prepareErrorForThunkRejection(e));
    }
});

export const login = createAsyncThunk(
    `${sliceName}/login`,
    async ({ email, password }: LoginModel, thunkAPI) => {
        try {
            const auth = getAuth();
            const login = await signInWithEmailAndPassword(auth, email, password);
            const user = login && auth.currentUser;

            const docRef = user && doc(db, dbName, user.uid);
            const docSnap = docRef && (await getDoc(docRef));

            if (docSnap && docSnap.exists()) {
                await storeService.triggerNotificatorSuccess(thunkAPI, 'Login successful!');

                return {
                    ...(docSnap.data() as UserModel),
                } as UserState;
            } else {
                // eslint-disable-next-line
                throw 'No user data found!';
            }
        } catch (e) {
            await storeService.triggerNotificatorError(thunkAPI, 'Error when logging in', e);
            return thunkAPI.rejectWithValue(storeService.prepareErrorForThunkRejection(e));
        }
    }
);

export const restoreLogin = createAsyncThunk(`${sliceName}/restoreLogin`, async (_, thunkAPI) => {
    try {
        const auth = getAuth();
        const user = auth.currentUser;

        const docRef = user && doc(db, dbName, user.uid);
        const docSnap = docRef && (await getDoc(docRef));

        if (user && docSnap && docSnap.exists()) {
            await storeService.triggerNotificatorSuccess(thunkAPI, 'Restored Login successfully!');

            return {
                ...(docSnap.data() as UserModel),
                uid: user.uid,
                email: user.email,
            } as UserState;
        } else {
            // eslint-disable-next-line
            throw 'No user data found!';
        }
    } catch (e) {
        await storeService.triggerNotificatorError(thunkAPI, 'Error when restoring login', e);
        return thunkAPI.rejectWithValue(storeService.prepareErrorForThunkRejection(e));
    }
});

export const resetPassword = createAsyncThunk(
    `${sliceName}/resetPassword`,
    async ({ email }: ResetPwModel, thunkAPI) => {
        try {
            const auth = getAuth();
            await sendPasswordResetEmail(auth, email);
            await storeService.triggerNotificatorSuccess(thunkAPI, 'Reset email was sent!');

            return;
        } catch (e) {
            await storeService.triggerNotificatorError(thunkAPI, 'Error when resetting email', e);
            return thunkAPI.rejectWithValue(storeService.prepareErrorForThunkRejection(e));
        }
    }
);

export const signup = createAsyncThunk(
    `${sliceName}/signup`,
    async ({ email, password, firstName, lastName }: SignUpModel, thunkAPI) => {
        try {
            const auth = getAuth();
            await createUserWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser;

            if (user) {
                const userData: UserModel = {
                    ...emptyUser,
                    uid: user.uid,
                    email: user.email ?? '',
                    firstName,
                    lastName,
                };

                await setDoc(doc(db, dbName, user.uid), {
                    ...userData,
                });

                await storeService.triggerNotificatorSuccess(thunkAPI, 'Sign-Up successful!');

                return {
                    ...userData,
                } as UserState;
            } else {
                // eslint-disable-next-line
                throw 'Could not create user';
            }
        } catch (e) {
            await storeService.triggerNotificatorError(thunkAPI, 'Error when signing up', e);
            return thunkAPI.rejectWithValue(storeService.prepareErrorForThunkRejection(e));
        }
    }
);

interface UpdateUserPayload {
    firstName: string;
    lastName: string;
    address: AddressModel;
}

export const updateUser = createAsyncThunk(
    `${sliceName}/updateUser`,
    async (profileData: ProfileModel, thunkAPI) => {
        try {
            const auth = getAuth();
            const user = auth.currentUser;

            if (!user || user.uid !== profileData.uid) {
                // eslint-disable-next-line
                throw 'Could not update profile because of user authentication issues';
            }

            if (profileData.thumbnail?.image) {
                const photoUrl = await storeService.uploadImageAndReturnUrl(
                    profileData.thumbnail.image,
                    `images/users/thumbnails/${user.uid}/${profileData.thumbnail.image.name}`
                );
                await updateProfile(user, {
                    photoURL: photoUrl,
                });
            }

            if (
                (profileData.newPassword?.length ?? 0) > minPasswordLength - 1 &&
                profileData.newPasswordConfirm &&
                profileData.newPassword === profileData.newPasswordConfirm
            ) {
                await updatePassword(user, profileData.newPassword);
            }

            await setDoc(
                doc(db, dbName, user.uid),
                {
                    email: user.email,
                    firstName: profileData.firstName,
                    lastName: profileData.lastName,
                    address: { ...profileData.address },
                },
                { merge: true }
            );
            await storeService.triggerNotificatorSuccess(thunkAPI, 'Profile Update successful!');

            return {
                firstName: profileData.firstName,
                lastName: profileData.lastName,
                address: { ...profileData.address },
            };
        } catch (e) {
            await storeService.triggerNotificatorError(thunkAPI, 'Error when updating user', e);
            return thunkAPI.rejectWithValue(storeService.prepareErrorForThunkRejection(e));
        }
    }
);

const initialState: UserState = { ...emptyUser };

export const userSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action: PayloadAction<UserState>) => {
            return action.payload;
        });
        builder.addCase(restoreLogin.fulfilled, (state, action: PayloadAction<UserState>) => {
            return action.payload;
        });
        builder.addCase(signup.fulfilled, (state, action: PayloadAction<UserState>) => {
            return action.payload;
        });
        builder.addCase(logout.fulfilled, () => {
            return { ...emptyUser } as UserState;
        });
        builder.addCase(updateUser.fulfilled, (state, action: PayloadAction<UpdateUserPayload>) => {
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.address = action.payload.address;
        });
    },
});
