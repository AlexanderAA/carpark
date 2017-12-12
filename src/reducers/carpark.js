import {
  CMD_REPORT,
  CMD_PLACE,
  CMD_MOVE,
  CMD_LEFT,
  CMD_RIGHT,
  report
} from '../actions/actions';

const carpark = (state = {busState: report()}, action) => {
  switch (action.type) {
    case CMD_REPORT:
    case CMD_PLACE:
    case CMD_MOVE:
    case CMD_LEFT:
    case CMD_RIGHT:
      return { ...state, busState: action.busState  }
    default:
      console.log("DEFAULT AT", action)
      return state;
  }
};

export default carpark;
