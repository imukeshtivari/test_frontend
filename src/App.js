import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from "react-router-dom";

// import custom cmomponents.
import PrivateRoute from "./components/PrivateRoute";
import Login from "./containers/Login";
import Register from "./containers/Register";
import Admin from "./containers/Admin";
import User from "./containers/User";

// importing custom css.
import './styles/app.css';

class App extends Component {
  render() {
    return (
      <div className="container my-3">
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <PrivateRoute path="/admin" component={Admin} />
            <PrivateRoute path="/" component={User} />
            <Route 
              render={() => (
                <div>
                  <h3>
                    Sorry, page not found (404)
                  </h3>
                  <br/>
                  Go to <Link to="/">Home</Link>
                </div>
              )}
            />

          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
