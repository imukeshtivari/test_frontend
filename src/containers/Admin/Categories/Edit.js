import React, { Component } from "react";

import api from "../../../helpers/api";

class EditCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      name: ""
    };

    [
      "_handleSubmit"
    ].forEach((fn) => this[fn] = this[fn].bind(this));
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;

    api()
      .get(`/admin/categories/${id}`)
      .then((response) => this.setState({ loading: false, name: response.data.category.name }))
      .catch(() => alert("error in getting category details."))
  }

  _handleSubmit(e) {
    e.preventDefault();
    const { match: { params: { id } } } = this.props;

    api()
      .put(`/admin/categories/${id}`, this.state)
      .then(() => alert("category updated successfully."))
      .catch(() => alert("something went wrong."));

  }

  render() {
    const { loading, name } = this.state;

    if (loading) return (<h4>loading...</h4>);

    return (
      <form className="form-inline" onSubmit={this._handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Category Name</label>
          <input type="text" className="form-control mx-2" name="name" id="name" placeholder="Enter category name" value={name} onChange={(e) => this.setState({ [e.target.name]: e.target.value })} />
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    )
  }
}

export default EditCategory;