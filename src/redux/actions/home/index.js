import { HOME } from "../../constants/home";

export function userLogin(data) {
  return {
    type: HOME.LOGIN.MAIN,
    data,
  };
}

export function logOut() {
  return {
    type: HOME.LOGOUT,
  };
}
