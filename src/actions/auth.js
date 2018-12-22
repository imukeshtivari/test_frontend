// ======================================================================================
/*
 * save oauth token
 */
export const SAVE_OAUTH_TOKEN = "SAVE_OAUTH_TOKEN";

export function saveAuthToken(token) {
  return (dispatch) => {
    return dispatch({
      type: SAVE_OAUTH_TOKEN,
      token
    });
  };
}

// ======================================================================================
/*
 * delete oauth token
 */
export const DELETE_OAUTH_TOKEN = "DELETE_OAUTH_TOKEN";

export function deleteAuthToken() {
  return (dispatch) => {
    return dispatch({ type: DELETE_OAUTH_TOKEN });
  };
}

// ======================================================================================