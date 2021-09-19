import { DEVICES } from "../../constants/devices";

export function getDevices() {
  return {
    type: DEVICES.GET_DEVICES.MAIN,
  };
}

export function completeNotify(data) {
  return {
    type: DEVICES.NOTIFY.MAIN,
    data,
  };
}
