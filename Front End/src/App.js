import React from "react";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Navigation from './Components/Navigation';
import Team from './Components/Team'
import Weather from "./Components/Weather";
import "./App.css";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from "@fortawesome/free-brands-svg-icons"

library.add(fab);

function App() {
  return (
    <React.Fragment>
      <Router>
        <Navigation />
        <Switch>
          <Route path="/about" exact component={() => <Team />} />    
          <Route path="/" exact component={() => <div className="container1"><Weather /></div>} />
          <Redirect fromn='*' to='/' />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
