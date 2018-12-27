import React from "react";
import { Switch, Route } from "react-router-dom";

import List from "./List";
import NewCategory from "./New";
import EditCategory from "./Edit";

export default function (props) {
  return (
    <div className="categories">
      <Switch>
        <Route path={`${props.match.url}/new`} component={NewCategory} />
        <Route path={`${props.match.url}/:id/edit`} component={EditCategory} />
        <Route path={`${props.match.url}/`} component={List} />
      </Switch>
    </div>
  )
}