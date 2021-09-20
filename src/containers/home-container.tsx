import Home from "../components/Home/Home";
import {useHistory} from "react-router";
import React, {useEffect} from "react";
import {SignInState, SignUpState} from "../components/Home/types";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {login, selectUser} from "../slices/userSlice";

const HomeContainer = () => {
    let history = useHistory();
    const dispatch = useAppDispatch();
    const {uid} = useAppSelector(selectUser);

    useEffect(() => {
        if (uid && uid?.length > 0) {
            history.push("/dashboard");
        }
    }, [uid])

    const handleSignIn = (state: SignInState) => {
        dispatch(login(state))
    }

    const handleSignUp = (state: SignUpState) => {
        // console.log('state: ', state)
        // history.push("/dashboard");
        // const auth = getAuth();
        // const user = auth.currentUser;
        // console.log(auth)
        // createUserWithEmailAndPassword(auth, state.email, state.password)
        //     .then(() => {
        //         updateProfile(user, {displayName: state.firstName})
        //             .then(() => history.push('/dashboard'))
        //             .catch((e) => alert(e.message))
        //     }).catch((e) => alert(e.message))
    }

    return <Home handleSignIn={handleSignIn} handleSignUp={handleSignUp}/>
}

export default HomeContainer;
