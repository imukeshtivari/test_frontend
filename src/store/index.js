import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import rootReducer from "../reducers";

const persistConfig = {
  key: "store",
  storage,
  whitelist: ['auth', 'user']
};

let middleware;

// loading required middlewares depending upon the environment
if (process.env.NODE_ENV === "production") {
  middleware = applyMiddleware(
    thunk // applying thunk middleware for distatching action based upon conditions.
  );
} else {
  middleware = composeWithDevTools(
    applyMiddleware(
      thunk
    )
  );
}

const pReducer = persistReducer(persistConfig, rootReducer);

// creating the main store.
export const store = createStore(pReducer, middleware);
export const persistor = persistStore(store);