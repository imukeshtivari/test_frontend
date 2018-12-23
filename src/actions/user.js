// save user details
export const SAVE_USER_DETAILS = "SAVE_USER_DETAILS";

export function saveUserDetails(user) {
  return (dispatch) => {
    return dispatch({
      type: SAVE_USER_DETAILS,
      user
    });
  };
}