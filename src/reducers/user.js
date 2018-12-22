import { combineReducers } from "redux";
import actionTypes from "../actions";

// ======================================================================================
// save user details

export const details = (state = null, action) => {
    switch (action.type) {
        case actionTypes.SAVE_USER_DETAILS:
            return action.user;
        default:
            return state;
    }
};

export default {
    user: combineReducers({
        details
    })
}