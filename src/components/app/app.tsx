import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HomeRoute } from '../../routes/home.route';
import { DashboardRoute } from '../../routes/dashboard.route';
import './app.css';
import routes from '../../routes/route-constants';
import PrivateRoute from '../../routes/private.route';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { restoreLogin } from '../../store/slices/user.slice';
import { selectUser } from '../../store/selectors';

function App() {
    const { uid } = useAppSelector(selectUser);
    const auth = getAuth();
    const dispatch = useAppDispatch();

    onAuthStateChanged(auth, (user) => {
        if (user && !uid) {
            dispatch(restoreLogin());
        }
    });

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
                    <PrivateRoute exact={false} component={DashboardRoute} path={routes.AUTHENTICATED_AREA} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
