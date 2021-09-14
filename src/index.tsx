import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import theme from "./theme/theme";
import {ThemeProvider} from '@material-ui/core/styles';

ReactDOM.render(
    <React.Fragment>
        <ThemeProvider theme={theme}>
            <ErrorBoundary>
                <App/>
            </ErrorBoundary>
        </ThemeProvider>
    </React.Fragment>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
