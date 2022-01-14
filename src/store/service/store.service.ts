import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { RootState } from '../store';
import { Dispatch } from 'redux';
import { setNotificator } from '../slices/notificator.slice';

export const getUidFromStoreState = (thunkAPI: { getState: () => any }) => {
    const state = thunkAPI.getState() as RootState;
    return state?.user?.uid;
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

export const triggerNotificatorError = async (
    thunkAPI: { dispatch: Dispatch },
    messagePrefix: string,
    error?: any
) => {
    let errorMessage = '';

    if (error && typeof error === 'string') {
        errorMessage = error;
    } else if (error instanceof Error) {
        // TODO: Map error codes to proper messages (use extra service)
        errorMessage = error.message;
    } else {
        errorMessage = error as string;
    }

    thunkAPI.dispatch(
        setNotificator({
            notificatorOpen: true,
            notificatorType: 'error',
            notificatorMessage: `${messagePrefix}${errorMessage ? ` - ${errorMessage}` : ''}`,
        })
    );
};
