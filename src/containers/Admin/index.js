import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";

import api from "../../helpers/api";
import { saveUserDetails } from "../../actions/user";

import Header from "../../components/layout/Header";
import Products from "./Products";
import Categories from "./Categories";
import Users from "./Users";
import Orders from "./Orders";

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    const { saveUserDetails, history } = this.props;

    api()
      .get(`/user`)
      .then((response) => {
        saveUserDetails(response.data);

        this.setState({ loading: false });

        if (response.data.role !== "admin") {
          history.push("/login");
        }
      })
      .catch(() => history.push("/login"))
  }

  render() {
    const { match: { url } } = this.props;

    if (this.state.loading) return (<h2>Loading...</h2>)

    return (
      <div className="admin">
        <Header />
        <Switch>
          <Route path={`${url}/categories`} component={Categories} />
          <Route path={`${url}/products`} component={Products} />
          <Route path={`${url}/orders`} component={Orders} />
          <Route path={`${url}/users`} component={Users} />
          <Redirect to={`${url}/categories`} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  token: _.get(state, "auth.data.token")
});

const mapDispatchToProps = (dispatch) => ({
  saveUserDetails: (payload) => dispatch(saveUserDetails(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin);