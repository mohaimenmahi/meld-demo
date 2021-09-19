import { call, takeLatest, put } from "redux-saga/effects";
import { HOME } from "../../constants/home";
import { AxiosServices } from "../../../network/AxiosServices";
import { ApiServices } from "../../../network/ApiServices";

function* userLogin(actions) {
  try {
    let result = yield call(
      AxiosServices.post,
      ApiServices.USER_LOGIN,
      actions.data
    );

    yield put({
      type: HOME.LOGIN.SUCCESS,
      result: result.data,
    });
  } catch (err) {
    yield put({
      type: HOME.LOGIN.FAILURE,
      result: err.response.data,
    });
  }
}

export default function* homeSagas() {
  yield takeLatest(HOME.LOGIN.MAIN, userLogin);
}
