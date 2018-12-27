import React, { Component } from "react";
import { Link, Switch, Route } from "react-router-dom";

import api from "../../../helpers/api";

class Users extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      users: []
    };

    [
      "_getUsers"
    ].map((fn) => this[fn] = this[fn].bind(this));
  }

  _getUsers() {
    api()
      .get(`/admin/users`)
      .then((response) => this.setState({ loading: false, users: response.data.users }))
      .catch(() => alert("error in loading users."))
  }

  componentDidMount() {
    this._getUsers();
  }

  _handleDelete(id) {
    if (!window.confirm("Are you sure, You want to delete?")) return;

    api()
      .delete(`/admin/users/${id}`)
      .then(() => {
        this._getUsers();
        alert("User successfully deleted.");
      })
      .catch(() => alert("Something went wrong."))
  }

  render() {
    const { loading, users } = this.state;

    if (loading) return (<h2>Loading...</h2>)

    return (
      <div className="users">
        Users

        {(users.length) ? (
          <ul className="list-group my-4">
            {(users || []).map((user) => (
              <li className="list-group-item" key={user.id}>
                {`${user.name} ( ${user.email} )`}
                <div className="btn-group btn-group-sm float-right" role="group">
                  <button type="button" className="btn btn-danger" onClick={() => this._handleDelete(user.id)}><i className="fa fa-trash" /></button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
            <h4>No users found.</h4>
          )}
      </div>
    )
  }
}

export default Users;