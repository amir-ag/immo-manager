import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { RootState } from '../store';
import { Dispatch } from 'redux';
import { setNotificator } from '../slices/notificator.slice';
import { collection, query, where } from 'firebase/firestore';
import { db } from '../../index';

export const getUidFromStoreState = (thunkAPI: { getState: () => any }) => {
    const state = thunkAPI.getState() as RootState;
    const uid = state?.user?.uid;

    if (!uid) {
        // eslint-disable-next-line
        throw 'Problem with user id';
    }

    return uid;
};

export const buildGetEntitiesQuery = (dbName: string, uid: string) => {
    return query(collection(db, dbName), where('createdBy', '==', uid));
};

export const uploadImageAndReturnUrl = async (image: File | null, storageUrl: string) => {
    if (image) {
        const storage = getStorage();
        const storageRef = ref(storage, storageUrl);
        const uploadResult = await uploadBytes(storageRef, image);
        return await getDownloadURL(uploadResult.ref);
    }

    return '';
};

export const triggerNotificatorSuccess = async (thunkAPI: { dispatch: Dispatch }, message: string) => {
    thunkAPI.dispatch(
        setNotificator({
            notificatorOpen: true,
            notificatorType: 'success',
            notificatorMessage: message,
        })
    );
};

export const prepareErrorForThunkRejection = (error: any) => {
    if (!error) {
        return '';
    }

    return error?.message ?? error;
};

export const triggerNotificatorError = async (
    thunkAPI: { dispatch: Dispatch },
    messagePrefix: string,
    error?: any
) => {
    let errorMessage;

    if (error?.code) {
        errorMessage = error.code;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    } else {
        errorMessage = error;
    }

    thunkAPI.dispatch(
        setNotificator({
            notificatorOpen: true,
            notificatorType: 'error',
            notificatorMessage: `${messagePrefix}${errorMessage ? ` - ${errorMessage}` : ''}`,
        })
    );
};
