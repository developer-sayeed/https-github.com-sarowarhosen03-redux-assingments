import { DELETE_BOOKING, NEW_BOOKING } from "./actionTypes";

let initialState = [];

const FlightBookingReducer = (state = initialState, action) => {
  switch (action.type) {

    case NEW_BOOKING:
      let copyState = structuredClone(state);
      copyState.push({...action.payload});
      return copyState;
    case DELETE_BOOKING:
      let oldState = structuredClone(state);
      return oldState.filter((Element) => Element.id !== action.id);
    default:
      return state;
  }
};
export default FlightBookingReducer;
