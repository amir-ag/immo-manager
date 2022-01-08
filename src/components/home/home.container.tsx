import { useHistory } from 'react-router';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/store.hooks';
import { login, resetPassword, signup } from '../../store/slices/user.slice';
import routes from '../../routes/route-constants';
import { SignInState } from './sign-in/sign-in';
import { SignUpState } from './sign-up/sign-up';
import Home from './home';
import { selectUser } from '../../store/selectors';
import { setSnackbar } from '../../store/slices/snackbar.slice';

const HomeContainer = () => {
    let history = useHistory();
    const dispatch = useAppDispatch();
    const { uid } = useAppSelector(selectUser);

    useEffect(() => {
        if (uid && uid?.length > 0) {
            dispatch(
                setSnackbar({
                    snackbarOpen: true,
                    snackbarType: 'success',
                    snackbarMessage: 'Logged in successfully',
                })
            );
            history.push(routes.DASHBOARD);
        }
    }, [uid, history]);

    const handleSignIn = (state: SignInState) => {
        dispatch(login(state));
    };

    const handleSignUp = (state: SignUpState) => {
        dispatch(signup(state));
    };

    const handleReset = (email: string) => {
        dispatch(resetPassword(email));
        dispatch(
            setSnackbar({
                snackbarOpen: true,
                snackbarType: 'success',
                snackbarMessage: 'Reset password email sent',
            })
        );
        history.push(routes.AUTHENTICATED_AREA);
    };

    return <Home handleSignIn={handleSignIn} handleSignUp={handleSignUp} handleReset={handleReset} />;
};

export default HomeContainer;
