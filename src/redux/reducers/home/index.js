import { HOME } from "../../constants/home";

let initState = {
  authToken: null,
  authLoading: false,
  authMessage: null,
  authErr: null,
};

export default function homeReducer(state = initState, actions) {
  switch (actions.type) {
    case HOME.LOGIN.MAIN:
      return {
        ...state,
        authLoading: true,
        authErr: null,
        authMessage: null,
      };

    case HOME.LOGIN.SUCCESS:
      return {
        ...state,
        authToken: actions.result,
        authLoading: false,
      };

    case HOME.LOGIN.FAILURE:
      return {
        ...state,
        authLoading: false,
        authErr: actions.result,
      };

    case HOME.LOGOUT:
      return {
        ...state,
        authToken: null,
        authErr: null,
        authLoading: false,
      };

    default:
      return state;
  }
}
