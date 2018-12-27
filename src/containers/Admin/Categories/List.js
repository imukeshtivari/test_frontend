import React, { Component } from 'react'
import { Link } from "react-router-dom";

import api from "../../../helpers/api";

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      categories: []
    };

    [
      "_getCategories",
      "_handleDelete"
    ].map((fn) => this[fn] = this[fn].bind(this));
  }

  componentDidMount() {
    this._getCategories();
  }

  _getCategories() {
    api()
      .get(`/admin/categories`)
      .then((response) => this.setState({ loading: false, categories: response.data.categories }))
      .catch((error) => alert("error in loading categories."))
  }

  _handleDelete(id) {
    api()
      .delete(`/admin/categories/${id}`)
      .then(() => {
        this._getCategories();
        alert("Category successfully deleted.");
      })
      .catch((error) => alert("Something went wrong."))
  }

  render() {
    const { match: { url } } = this.props;
    const { loading, categories } = this.state;

    if (loading) return (<h2>Loading...</h2>)

    return (
      <div>
        Categories
        <Link to={`${url}/new`} type="button" className="btn btn-primary float-right"><i className="fa fa-plus" /></Link>

        {(categories.length) ? (
          <ul className="list-group my-4">
            {(categories || []).map((category) => (
              <li className="list-group-item" key={category.id}>
                {category.name}
                <div className="btn-group btn-group-sm float-right" role="group">
                  <Link to={`${url}/${category.id}/edit`} type="button" className="btn btn-success"><i className="fa fa-pencil-alt" /></Link>
                  <button type="button" className="btn btn-danger" onClick={() => this._handleDelete(category.id)}><i className="fa fa-trash" /></button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
            <h4>No categories found.</h4>
          )}
      </div>
    )
  }
}

export default List;