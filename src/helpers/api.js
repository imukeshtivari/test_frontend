import axios from "axios";
import _ from "lodash";

import { store } from "../store";
import config from "../config";

export default function(){
  const state = store.getState();
  const token = _.get(state, "auth.data.token");

  return axios.create({
    baseURL: `${config.API_ENDPOINT}/api`,
    headers: {'authorization': `bearer ${token}`}
  });
}