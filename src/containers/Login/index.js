import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import api from "../../helpers/api";
import { saveAuthToken } from "../../actions/auth";

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };

    [
      "_handleChange",
      "_handleSubmit"
    ].forEach((fn) => this[fn] = this[fn].bind(this));
  }

  _handleSubmit(e) {
    e.preventDefault();
    const { saveAuthToken, history } = this.props;
    const { email, password } = this.state;

    api()
      .post(`/login`, { email, password })
      .then((response) => {
        let { data } = response;

        // decoding token.
        data["details"] = JSON.parse(atob(data.token.split(".")[1]));
        saveAuthToken(data);

        if (data.details.role === "admin") {
          history.push(`/admin`);
          return;
        }
        history.push(`/`);
        return;
      })
      .catch(() => alert("Invalid Username/Password, Please Try again."));
  }

  _handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <form className="login col-4 mx-auto my-5" onSubmit={this._handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={this._handleChange} />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={this._handleChange} />
        </div>
        <div className="form-group">
          Click here to <Link to="/register">Register</Link>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveAuthToken: (token) => dispatch(saveAuthToken(token))
})

export default connect(null, mapDispatchToProps)(Login);