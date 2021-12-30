import { RootState } from './store';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

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
