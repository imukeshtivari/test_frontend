import React, { Component } from "react";

import api from "../../../helpers/api";

class EditProduct extends Component {
  constructor(props) {
    super(props);

    this.defaultState = {
      loading: true,
      title: "",
      category_id: "",
      price: "",
      description: "",
      image: null,
      categories: []
    };

    this.state = this.defaultState;

    [
      "_handleSubmit",
      "_handleChange",
      "_handleFile",
      "_clear"
    ].forEach((fn) => this[fn] = this[fn].bind(this));
  }

  _clear() {
    const { loading, ...rest } = this.defaultState;
    this.setState(rest);
  }

  _loadCategories() {
    api()
      .get(`/admin/categories`)
      .then((response) => this.setState({ categories: response.data.categories }))
      .catch(() => alert("error in loading categories."))
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;

    this._loadCategories();

    api()
      .get(`/admin/products/${id}`)
      .then((response) => {
        const { product } = response.data;

        this.setState({
          loading: false,
          ...product
        });
      })
      .catch(() => alert("error in getting prouct details."))
  }

  _handleSubmit(e) {
    e.preventDefault();
    const { match: { params: { id } } } = this.props;

    api()
      .put(`/admin/products/${id}`, this.state)
      .then(() => alert("Product updated successfully."))
      .catch(() => alert("Something went wrong."));
  }

  _handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  _handleFile(e) {
    if (!e.target.files.length) return;

    const image = e.target.files[0];

    let payload = new FormData();
    payload.append("image", image, image.name);

    api()
      .post("/admin/upload", payload)
      .then((response) => this.setState({ image: response.data.url }))
      .catch(() => this.setState({ image: "" }))
  }

  render() {
    const { loading, title, category_id, price, description, categories } = this.state;

    if (loading) return (<h4>Loading...</h4>)

    return (
      <form className="" onSubmit={this._handleSubmit}>
        Update Product Details
        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" className="form-control" id="title" placeholder="Enter product name" value={title} onChange={this._handleChange} />
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="category_id">Category</label>
            <select className="form-control" name="category_id" id="category_id" value={category_id} onChange={this._handleChange}>
              <option value="">Select</option>
              {(categories || []).map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="price">Price</label>
            <input type="text" className="form-control" id="price" name="price" placeholder="0.00" value={price} onChange={this._handleChange} />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input type="file" className="form-control-file" id="image" name="image" onChange={this._handleFile} />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea className="form-control" id="description" name="description" rows="3" value={description} onChange={this._handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
        <button type="reset" className="btn btn-danger ml-1" onClick={this._clear}>Clear</button>
      </form>
    )
  }
}

export default EditProduct;