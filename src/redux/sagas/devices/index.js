import { call, takeLatest, put } from "redux-saga/effects";
import { DEVICES } from "../../constants/devices";
import { AxiosServices } from "../../../network/AxiosServices";
import { ApiServices } from "../../../network/ApiServices";

function* getDevices(actions) {
  try {
    let result = yield call(AxiosServices.get, ApiServices.GET_DEVICES, null);

    yield put({
      type: DEVICES.GET_DEVICES.SUCCESS,
      result: result.data,
    });
  } catch (err) {
    yield put({
      type: DEVICES.GET_DEVICES.FAILURE,
    });
  }
}

function* notifyComplete(actions) {
  try {
    let result = yield call(
      AxiosServices.post,
      ApiServices.NOTIFY,
      actions.data
    );

    yield put({
      type: DEVICES.NOTIFY.SUCCESS,
    });
  } catch (err) {}
}

export default function* deviceSagas() {
  yield takeLatest(DEVICES.GET_DEVICES.MAIN, getDevices);
  yield takeLatest(DEVICES.NOTIFY.MAIN, notifyComplete);
}
