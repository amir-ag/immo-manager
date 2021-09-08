import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {HomeRoute} from "../../routes/home-route";
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={HomeRoute}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
