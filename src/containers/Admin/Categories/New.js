import React, { Component } from "react";

import api from "../../../helpers/api";

class NewCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ""
    };

    [
      "_handleSubmit"
    ].forEach((fn) => this[fn] = this[fn].bind(this));
  }

  _handleSubmit(e) {
    e.preventDefault();

    const { name } = this.state;

    api()
      .post("/admin/categories", {
        name
      })
      .then(() => {
        this.setState({ name: "" })
        alert("Category added successfully.");
      })
      .catch(() => alert("something went wrong."));

  }

  render() {
    const { name } = this.state;

    return (
      <form className="form-inline" onSubmit={this._handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Category Name</label>
          <input type="text" className="form-control mx-2" name="name" id="name" placeholder="Enter category name" value={name} onChange={(e) => this.setState({ [e.target.name]: e.target.value })} />
        </div>
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    )
  }
}

export default NewCategory;