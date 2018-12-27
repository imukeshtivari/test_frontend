import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";

class PrivateRoute extends React.Component {

  render() {
    const { component: Component, token, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={(props) =>
          !_.isEmpty(token) ? (
            <Component {...props} />
          ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location }
                }}
              />
            )
        }
      />
    )
  }
}

const mapStateToProps = (state) => ({
  token: _.get(state, "auth.data.token")
})

export default connect(mapStateToProps)(PrivateRoute);