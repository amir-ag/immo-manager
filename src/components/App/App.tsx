import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {HomeRoute} from "../../routes/home-route";
import './App.css';
import routes from "../../routes/constant";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path={routes.HOME} component={HomeRoute}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
