import { useHistory } from 'react-router';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/store.hooks';
import { login, signup } from '../../store/slices/user.slice';
import routes from '../../routes/route-constants';
import { SignInState } from '../sign-in/sign-in';
import { SignUpState } from '../sign-up/sign-up';
import Home from './home';
import { selectUser } from '../../store/selectors';

const HomeContainer = () => {
    let history = useHistory();
    const dispatch = useAppDispatch();
    const { uid } = useAppSelector(selectUser);

    useEffect(() => {
        if (uid && uid?.length > 0) {
            history.push(routes.DASHBOARD);
        }
    }, [uid, history]);

    const handleSignIn = (state: SignInState) => {
        dispatch(login(state));
    };

    const handleSignUp = (state: SignUpState) => {
        dispatch(signup(state));
    };

    return <Home handleSignIn={handleSignIn} handleSignUp={handleSignUp} />;
};

export default HomeContainer;
