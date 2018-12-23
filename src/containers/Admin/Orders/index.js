import React, { Component } from "react";

import api from "../../../helpers/api";

class Orders extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      orders: []
    };

    [
      "_getOrders"
    ].map((fn) => this[fn] = this[fn].bind(this));
  }

  _getOrders() {
    api()
      .get(`/admin/orders`)
      .then((response) => {
        if (response.status === 200) {
          this.setState({ loading: false, orders: response.data.orders });
        }
      })
      .catch((error) => alert("error in loading orders."))
  }

  componentDidMount() {
    this._getOrders();
  }

  render() {
    const { loading, orders } = this.state;

    if (loading) return (<h2>Loading...</h2>)

    return (
      <div className="categories">
        Orders

        {(orders.length) ? (
          <ul className="list-group my-4">
            {(orders || []).map((order) => (
              <li key={order.id} className="list-group-item my-1" key={order.id}>
                <h5>
                  {`User: ${order.user.name} ( ${order.user.email} )`}
                  <span className="badge badge-primary badge-pill float-right">{`Total: ₹. ${order.total}`}</span>
                </h5>

                <ul className="list-group list-group-flush">
                  {(order.items || []).map((item) => (
                    <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                      {`${item.product.title} ( ₹. ${item.price} )`} 
                      <span className="badge badge-primary badge-pill">Qty: {item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
            <h4>No orders found.</h4>
          )}
      </div>
    )
  }
}

export default Orders;