import { all } from "redux-saga/effects";
import homeSagas from "./home";
import deviceSagas from "./devices";

function* rootSaga() {
  yield all([homeSagas(), deviceSagas()]);
}

export default rootSaga;
