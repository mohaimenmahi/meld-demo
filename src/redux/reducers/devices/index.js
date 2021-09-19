import { DEVICES } from "../../constants/devices";

let initState = {
  devices: 0,
  deviceLoading: false,
  deviceMsg: null,
  notifyLoading: false,
  notifyMsg: null,
  notifyErr: null,
};

export default function deviceReducer(state = initState, actions) {
  switch (actions.type) {
    case DEVICES.GET_DEVICES.MAIN:
      return {
        ...state,
        deviceLoading: true,
      };

    case DEVICES.GET_DEVICES.SUCCESS:
      let result = actions.result.devices;

      let num = result.length;

      return {
        ...state,
        devices: num,
        deviceLoading: false,
      };

    case DEVICES.GET_DEVICES.FAILURE:
      return {
        ...state,
        deviceLoading: false,
        deviceMsg: actions.result,
      };

    case DEVICES.NOTIFY.MAIN:
      return {
        ...state,
        notifyLoading: true,
        notifyMsg: null,
        notifyErr: null,
      };

    case DEVICES.NOTIFY.SUCCESS:
      return {
        ...state,
        notifyLoading: false,
        notifyErr: null,
        notifyMsg: "Completion notified Successfully",
      };

    case DEVICES.NOTIFY.FAILURE:
      return {
        ...state,
        notifyLoading: false,
        notifyErr: "Some error occured when sending notifications",
        notifyMsg: null,
      };

    default:
      return state;
  }
}
