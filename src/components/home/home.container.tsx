import { useHistory } from 'react-router';
import React, { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/store/use-app-dispatch.hook';
import { login, resetPassword, signup } from '../../store/slices/user.slice';
import routes from '../../routes/route-constants';
import Home from './home';
import { selectUser } from '../../store/selectors';
import { setSnackbar } from '../../store/slices/snackbar.slice';
import { useAppSelector } from '../../hooks/store/use-app-selector.hook';
import { LoginModel } from './login/model/login.model';
import { SignUpModel } from './sign-up/model/sign-up.model';

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

    const handleLoginIn = (loginData: LoginModel) => {
        dispatch(login(loginData));
    };

    const handleSignUp = (signUpData: SignUpModel) => {
        dispatch(signup(signUpData));
    };

    const handleReset = (email: string) => {
        dispatch(resetPassword({ email }));
        dispatch(
            setSnackbar({
                snackbarOpen: true,
                snackbarType: 'success',
                snackbarMessage: 'Reset password email sent',
            })
        );
        history.push(routes.AUTHENTICATED_AREA);
    };

    return <Home handleLogin={handleLoginIn} handleSignUp={handleSignUp} handlePwReset={handleReset} />;
};

export default HomeContainer;
