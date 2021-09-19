import axios from "axios";
import { BASE_URL } from "../config";

function getIRequestProp() {
  let serverUrl = BASE_URL;
  return {
    serverUrl: serverUrl,
  };
}

async function get(url, parameter) {
  let { serverUrl } = getIRequestProp();
  return axios.get(serverUrl + url, {
    params: parameter,
  });
}

async function post(url, body) {
  let { serverUrl } = getIRequestProp();
  return await axios.post(serverUrl + url, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${body.token}`,
    },
  });
}

export const AxiosServices = {
  get,
  post,
};
