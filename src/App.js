import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

// import custom cmomponents.
import PrivateRoute from "./components/PrivateRoute";
import Login from "./containers/Login";

// importing custom css.
import './styles/app.css';

const Admin = () => {
  return "Admin"
}

const User = () => {
  return "User"
}

class App extends Component {
  render() {
    return (
      <div className="container">
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <PrivateRoute path="/admin" component={Admin} />
            <PrivateRoute path="/user" component={User} />
            <Redirect to="/login" />
          </Switch>

        </Router>
        container
      </div>
    );
  }
}

export default App;
