import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {HomeRoute} from "../../routes/home-route";
import {DashboardRoute} from "../../routes/dashboard-route";
import './App.css';
import routes from "../../routes/constant";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
            <Route exact path={routes.HOME}>
                <HomeRoute/>
            </Route>
            <Route path={routes.DASHBOARD}>
                <DashboardRoute/>
            </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
