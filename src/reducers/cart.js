import { combineReducers } from "redux";
import actionTypes from "../actions";

export const data = (state = [], action) => {
  switch (action.type) {
    case actionTypes.ADD_PRODUCT:
      return (state || []).concat([action.product]);
    case actionTypes.DELETE_PRODUCT:
      return (state || []).filter((p) => p.id !== action.id);
    case actionTypes.UPDATE_PRODUCT:
      return (state || []).map((p) => {
        if (p.id === action.product.id) {
          return action.product;
        }
        return p;
      });
    case actionTypes.EMPTY_CART:
      return [];
    default:
      return state;
  }
};

export default {
  cart: combineReducers({
    data
  })
};
