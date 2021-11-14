import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app';
import ErrorBoundary from './components/error/error-boundary';
import theme from './theme/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { firebaseConfig } from './firebase';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

initializeApp(firebaseConfig);
export const db = getFirestore();

ReactDOM.render(
    <React.Fragment>
        <ThemeProvider theme={theme}>
            <ErrorBoundary>
                <Provider store={store}>
                    <App />
                </Provider>
            </ErrorBoundary>
        </ThemeProvider>
    </React.Fragment>,
    document.getElementById('root')
);
