import Home from "../components/Home/Home";
import {useHistory} from "react-router";
import React from "react";
import {SignInState, SignUpState} from "../components/Home/types";
// import functions from selectors

const HomeContainer = () => {
    let history = useHistory();

    const handleSignIn = (state: SignInState) => {
        console.log('state: ', state)
        history.push("/dashboard");
    }

    const handleSignUp = (state: SignUpState) => {
        console.log('state: ', state)
        history.push("/dashboard");
    }

    return <Home handleSignIn={handleSignIn} handleSignUp={handleSignUp} />
}

export default HomeContainer;
