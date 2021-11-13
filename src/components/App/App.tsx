import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HomeRoute } from '../../routes/home-route';
import { DashboardRoute } from '../../routes/dashboard-route';
import './App.css';
import routes from '../../routes/route-constants';
import PrivateRoute from '../../helpers/PrivateRoute';

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path={routes.HOME}>
                        <HomeRoute />
                    </Route>
                    <Route exact path={routes.SIGNUP}>
                        <HomeRoute />
                    </Route>
                    <PrivateRoute exact={true} component={DashboardRoute} path={routes.DASHBOARD} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
