import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";

import { deleteAuthToken } from "../../actions/auth";

class Header extends Component {
  render() {
    const { details } = this.props;

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-2">
        <NavLink className="navbar-brand" to="/admin">{`Welcome, ${details.name} ( ${details.role} )`}</NavLink>
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/categories">Categories</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/products">Products</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/orders">Orders</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/users">Users</NavLink>
          </li>
          <li className="nav-item float-right">
            <NavLink className="nav-link" to="/login" onClick={() => this.props.deleteAuthToken()}>Logout</NavLink>
          </li>
        </ul>
      </nav>
    )
  }
}

const mapStateToProps = (state) => ({
  details: _.get(state, "user.details")
})

const mapDispatchToProps = (dispatch) => ({
  deleteAuthToken: () => dispatch(deleteAuthToken())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));