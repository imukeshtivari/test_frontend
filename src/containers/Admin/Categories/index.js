import React, { Component } from "react";
import { Link, Switch, Route } from "react-router-dom";

import api from "../../../helpers/api";
import NewCategory from "./New";
import EditCategory from "./Edit";

class Categories extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      categories: []
    };
  }

  _getCategories(){
    api()
    .get(`/admin/categories`)
    .then((response) => {
      if (response.status === 200) {
        this.setState({ loading: false, categories: response.data.categories });
      }
    })
    .catch((error) => alert("error in loading categories."))
  }

  componentDidMount() {
    this._getCategories();
  }

  _handleDelete(id){
    api()
    .delete(`/admin/categories/${id}`)
    .then((response) => {
      if (response.status === 200) {
        this._getCategories();
        alert("Category successfully deleted.");
      }
    })
    .catch((error) => alert("Something went wrong."))
  }

  render() {
    const { loading, categories } = this.state;

    if (loading) return (<h2>Loading...</h2>)

    return (
      <div className="categories">
        <Switch>
          <Route path="/admin/categories/new" component={NewCategory}/>
          <Route path="/admin/categories/:id/edit" component={EditCategory}/>
          <Route render={() => (
            <div>
              Categories
              <Link to="categories/new" type="button" className="btn btn-primary float-right"><i className="fa fa-plus" /></Link>

              {(categories.length)? (
                <ul className="list-group my-4">
                  {(categories || []).map((category) => (
                    <li className="list-group-item" key={category.id}>
                      {category.name}
                      <div className="btn-group btn-group-sm float-right" role="group">
                        <Link to={`categories/${category.id}/edit`} type="button" className="btn btn-success"><i className="fa fa-pencil-alt"/></Link>
                        <button type="button" className="btn btn-danger" onClick={() => this._handleDelete(category.id)}><i className="fa fa-trash"/></button>
                      </div>
                    </li>
                  ))}
                </ul>
              ):(
                <h4>No categories found.</h4>
              )}
            </div>
          )}/>
        </Switch>
      </div>
    )
  }
}

export default Categories;