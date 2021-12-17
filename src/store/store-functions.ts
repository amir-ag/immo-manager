import { RootState } from './store';

export const getUidFromStoreState = (thunkAPI: { getState: () => any }) => {
    const state = thunkAPI.getState() as RootState;
    return state?.user?.uid;
};
