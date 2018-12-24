import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import api from "../../helpers/api";
import config from "../../config";
import { saveAuthToken } from "../../actions/auth";

class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: "",
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

    api()
      .post(`/register`, this.state)
      .then((response) => {
        if (response.status === 200) {
          alert("Registration is successful.");
          history.push(`/login`);
          return;
        }
        alert("Something went wrong, Please Try again.");
      })
      .catch((error) => alert("Something went wrong, Please Try again."));
  }

  _handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <form className="register my-5" onSubmit={this._handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full name</label>
          <input type="text" name="name" className="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter full name" onChange={this._handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={this._handleChange} />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" className="form-control" id="password" placeholder="Password" onChange={this._handleChange} />
        </div>
        <div className="form-group">
          Click here to <Link to="/login">Login</Link>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveAuthToken: (token) => dispatch(saveAuthToken(token))
})

export default connect(null, mapDispatchToProps)(Register);