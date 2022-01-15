import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './slices/user.slice';
import { personsSlice } from './slices/persons.slice';
import { propertiesSlice } from './slices/properties.slice';
import { rentalUnitsSlice } from './slices/rental-units.slice';
import { tenanciesSlice } from './slices/tenancies.slice';
import { notificatorSlice } from './slices/notificator.slice';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        persons: personsSlice.reducer,
        properties: propertiesSlice.reducer,
        rentalUnits: rentalUnitsSlice.reducer,
        tenancies: tenanciesSlice.reducer,
        notificator: notificatorSlice.reducer,
    },
});
