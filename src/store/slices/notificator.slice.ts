import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificatorState {
    notificatorOpen: boolean;
    notificatorType: 'success' | 'info' | 'warning' | 'error' | undefined;
    notificatorMessage: string;
}

const initialState = {
    notificatorOpen: false,
    notificatorType: 'success',
    notificatorMessage: '',
} as NotificatorState;

export const notificatorSlice = createSlice({
    name: 'notificator',
    initialState,
    reducers: {
        setNotificator(state, action: PayloadAction<NotificatorState>) {
            const { notificatorOpen, notificatorMessage, notificatorType } = action.payload;
            state.notificatorOpen = notificatorOpen;
            state.notificatorType = notificatorType;
            state.notificatorMessage = notificatorMessage;
        },
    },
});

export const { setNotificator } = notificatorSlice.actions;
