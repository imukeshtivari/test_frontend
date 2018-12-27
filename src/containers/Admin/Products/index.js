import React from "react";
import { Switch, Route } from "react-router-dom";

import List from "./List";
import NewProduct from "./New";
import EditProduct from "./Edit";

export default function (props) {
  return (
    <div className="products">
      <Switch>
        <Route path={`${props.match.url}/new`} component={NewProduct} />
        <Route path={`${props.match.url}/:id/edit`} component={EditProduct} />
        <Route path={`${props.match.url}/`} component={List} />
      </Switch>
    </div>
  )
}