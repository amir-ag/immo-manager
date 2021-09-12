import React from "react";
import Dashboard from "../components/Dashboard/Dashboard";

const DashboardContainer = () => {

    const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log('e: ', e, 'edit property')
    }

    return (
        <Dashboard handleEdit={handleEdit} />
    );
};

// const mapStateToProps = (state: {}): {isLoggedIn: boolean} => {
//     return {
//         isLoggedIn: false
//     };
// }

// export default connect(mapStateToProps)(HomeContainer);
export default DashboardContainer;
