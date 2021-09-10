// import { connect } from "react-redux";
import Home from "../components/Home/Home";
import {useHistory} from "react-router";

// import functions from selectors

const HomeContainer = () => {

    let history = useHistory();

    const handleSubmit = () => {
        history.push("/dashboard");
    }

    return <Home handleSubmit={handleSubmit}/>
}

// const mapStateToProps = (state: {}): {isLoggedIn: boolean} => {
//     return {
//         isLoggedIn: false
//     };
// }

// export default connect(mapStateToProps)(HomeContainer);
export default HomeContainer;
