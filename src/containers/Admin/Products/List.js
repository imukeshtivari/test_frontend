import React, { Component } from 'react'
import { Link } from "react-router-dom";

import config from "../../../config";
import api from "../../../helpers/api";

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      products: []
    };

    [
      "_getProducts",
      "_handleDelete"
    ].map((fn) => this[fn] = this[fn].bind(this));
  }

  componentDidMount() {
    this._getProducts();
  }

  _getProducts() {
    api()
      .get(`/admin/products`)
      .then((response) => this.setState({ loading: false, products: response.data.products }))
      .catch(() => alert("error in loading products."))
  }

  _handleDelete(id) {
    if (!window.confirm("Are you sure, You want to delete?")) return;

    api()
      .delete(`/admin/products/${id}`)
      .then(() => {
        this._getProducts();
        alert("Product successfully deleted.");
      })
      .catch(() => alert("Something went wrong."))
  }

  render() {
    const { loading, products } = this.state;

    if (loading) return (<h2>Loading...</h2>)

    return (
      <div>
        Products

        <Link to="products/new" type="button" className="btn btn-primary float-right"><i className="fa fa-plus" /></Link>
        {(products.length) ? (
          <ul className="list-unstyled">
            {(products || []).map((product) => (
              <li key={product.id} className="media d-flex justify-content-between align-items-center my-4">
                <img src={`${config.IMG_ENDPOINT}/${product.image}`} className="mr-3" alt="..." style={{ width: "64px", height: "64px" }} />
                <div className="media-body">
                  <h5 className="mt-0 mb-1">{product.title}</h5>
                  {product.description}
                </div>
                <div className="btn-group btn-group-sm" role="group">
                  <Link to={`products/${product.id}/edit`} type="button" className="btn btn-success"><i className="fa fa-pencil-alt" /></Link>
                  <button type="button" className="btn btn-danger" onClick={() => this._handleDelete(product.id)}><i className="fa fa-trash" /></button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
            <h4>No products found.</h4>
          )}
      </div>
    )
  }
}

export default List;