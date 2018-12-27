export const ADD_PRODUCT = "ADD_PRODUCT";

export function addProduct(product) {
  return (dispatch) => {
    return dispatch({
      type: ADD_PRODUCT,
      product
    });
  };
}

export const DELETE_PRODUCT = "DELETE_PRODUCT";

export function deleteProduct(id) {
  return (dispatch) => {
    return dispatch({
      type: DELETE_PRODUCT,
      id
    });
  };
}

export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export function updateProduct(product) {
  return (dispatch) => {
    return dispatch({
      type: UPDATE_PRODUCT,
      product
    });
  };
}

export const EMPTY_CART = "EMPTY_CART";

export function emptyCart(product) {
  return (dispatch) => {
    return dispatch({
      type: EMPTY_CART
    });
  };
}