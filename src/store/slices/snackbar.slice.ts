import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SnackbarState {
    snackbarOpen: boolean;
    snackbarType: SnackbarType;
    snackbarMessage: string;
}

type SnackbarType = 'success' | 'info' | 'error' | 'warning';

const initialState = {
    snackbarOpen: false,
    snackbarType: 'success',
    snackbarMessage: '',
} as SnackbarState;

export const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        setSnackbar(state, action: PayloadAction<SnackbarState>) {
            const { snackbarOpen, snackbarMessage, snackbarType } = action.payload;
            state.snackbarOpen = snackbarOpen;
            state.snackbarMessage = snackbarMessage;
            state.snackbarType = snackbarType;
        },
    },
});

export const { setSnackbar } = snackbarSlice.actions;
