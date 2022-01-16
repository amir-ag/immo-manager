import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ErrorBoundary from './components/error/error-boundary';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { firebaseConfig } from './firebase';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import App from './components/app/app';
import CustomThemeProvider from './theming/custom-theme-provider';
import { CssBaseline } from '@material-ui/core';

initializeApp(firebaseConfig);
export const db = getFirestore();

ReactDOM.render(
    <React.Fragment>
        <CustomThemeProvider>
            <CssBaseline />
            <ErrorBoundary>
                <Provider store={store}>
                    <App />
                </Provider>
            </ErrorBoundary>
        </CustomThemeProvider>
    </React.Fragment>,
    document.getElementById('root')
);
