import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import n from "numeral";
import _ from "lodash";

import { deleteProduct, updateProduct, emptyCart } from "../../../actions/cart";
import api from "../../../helpers/api";
import config from "../../../config";

class Cart extends Component {
  constructor(props) {
    super(props);

    [
      "_deleteFromCart",
      "_updateQuantity",
      "_renderFooter",
      "_doCheckout"
    ].map((fn) => this[fn] = this[fn].bind(this));
  }

  componentDidMount() {
  }

  _deleteFromCart(id) {
    if (!window.confirm("Are you sure, you want to remove?")) return;

    this.props.deleteProduct(id);
  }

  _updateQuantity(quantity, product) {
    if (parseInt(quantity) <= 0) return;

    this.props.updateProduct({ ...product, quantity });
  }

  _renderFooter() {
    const { cart } = this.props;
    let sum = _.sumBy(cart, function (o) { return (o.quantity * o.price); });

    return (
      <div className="row">
        <div className="offset-md-6 col-6">
          <h5 className="text-right">{`Total: ₹. ${n(sum).format('0,0.00')}`}</h5>
          <button
            className={classNames("btn btn-success float-right", { "disabled": cart.length <= 0 })}
            onClick={() => this._doCheckout({
              order: cart,
              sum
            })}
            disabled={cart.length <= 0}
          >Checkout</button>
        </div>
      </div>
    );
  }

  _doCheckout(obj) {
    if (!obj.order.length) return;

    const { emptyCart } = this.props;

    api()
      .post("/orders", obj)
      .then(() => {
        emptyCart();
        alert("Order placed successfully.");
      })
      .catch(() => alert("Something went wrong."))
  }

  render() {
    const { cart } = this.props;

    return (
      <div className="cart">
        {(cart.length) ? (
          <ul className="list-unstyled">
            {(cart || []).map((c) => (
              <li key={c.id} className="media d-flex align-items-center my-1">
                <img src={`${config.IMG_ENDPOINT}/${c.image}`} className="mr-3" alt="..." style={{ width: "84px", height: "84px" }} />
                <div className="media-body col-10 px-0">
                  <h6><span className="badge badge-secondary">{`₹. ${n(c.price).format('0,0.00')}`}</span></h6>
                  <h5 className="mt-0 mb-1">{(c.title || "").toUpperCase()}</h5>
                  <p className="text-truncate">{c.description}</p>
                </div>
                <input className="form-control col-1 mx-2" type="number" value={c.quantity} onChange={(e) => this._updateQuantity(e.target.value, c)} />
                <div className="btn-group btn-group-sm" role="group">
                  <button type="button" className="btn btn-outline-danger" onClick={() => this._deleteFromCart(c.id)}><i className="fa fa-trash" /></button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
            <h4>Cart is empty.</h4>
          )}
        {this._renderFooter()}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cart: _.get(state, "cart.data", [])
});

const mapDispatchToProps = (dispatch) => ({
  deleteProduct: (product) => dispatch(deleteProduct(product)),
  updateProduct: (product) => dispatch(updateProduct(product)),
  emptyCart: () => dispatch(emptyCart()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);