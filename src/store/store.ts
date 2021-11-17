import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './slices/user.slice';
import { personsSlice } from './slices/persons.slice';

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        persons: personsSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
