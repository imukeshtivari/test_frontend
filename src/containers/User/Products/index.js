import React, { Component } from "react";
import { Link, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";

import { addProduct } from "../../../actions/cart";
import api from "../../../helpers/api";
import config from "../../../config";

class Products extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      products: []
    };

    [
      "_addToCart"
    ].map((fn) => this[fn] = this[fn].bind(this));
  }

  _getProducts(){
    api()
    .get(`/products`)
    .then((response) => {
      if (response.status === 200) {
        this.setState({ loading: false, products: response.data.products });
      }
    })
    .catch((error) => alert("error in loading products."))
  }

  componentDidMount() {
    this._getProducts();
  }

  _addToCart(product){
    const { addProduct, cart } = this.props;
    let f = true;

    (cart || []).forEach((c) => {
      if(c.id === product.id){
        f = false;
      }
    })

    if(!f) {
      alert("Product is already in cart.");
      return;
    }

    const quantity = parseInt(window.prompt("Enter Quantity: ")) || 0;

    if(!quantity) return;

    addProduct({...product, quantity});
  }

  render() {
    const { loading, products } = this.state;

    if (loading) return (<h2>Loading...</h2>)

    return (
      <div className="products">
        {(products.length)? (
          <div className="row">
            {(products || []).map((product) => (
              <div key={product.id} className="col-md-3 py-3">
                <span className="badge badge-secondary text-truncate float-right my-1">{product.category || "Unknown"}</span>
                <img src={`${config.IMG_ENDPOINT}/${product.image}`} className="img-thumbnail rounded mx-auto d-block" alt="..." style={{ height: "200px", width: "100%" }} />
                <div className="product-body">
                  <h5 className="my-1 text-truncate">{(product.title || "").toUpperCase()}</h5>
                  <p className="text-truncate">{product.description}</p>
                </div>
                <div className="btn-group btn-group-sm" role="group">
                  <button type="button" className="btn btn-outline-primary" onClick={() => this._addToCart(product)}>Add to cart</button>
                </div>
              </div>
            ))}
          </div>
        ):(
          <h4>No products found.</h4>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cart: _.get(state, "cart.data", [])
});

const mapDispatchToProps = (dispatch) => ({
  addProduct: (product) => dispatch(addProduct(product))
});

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Products);