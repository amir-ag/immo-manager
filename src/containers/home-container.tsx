// import { connect } from "react-redux";
import Home from "../components/Home/Home";
import {useHistory} from "react-router";
import React, {useState} from "react";

// import functions from selectors

const HomeContainer = () => {
    let history = useHistory();
    const [state, setState] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        history.push("/dashboard");
    }

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setState((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    return <Home handleSubmit={handleSubmit} onChange={onChange} state={state}/>
}

// const mapStateToProps = (state: {}): {isLoggedIn: boolean} => {
//     return {
//         isLoggedIn: false
//     };
// }

// export default connect(mapStateToProps)(HomeContainer);
export default HomeContainer;
