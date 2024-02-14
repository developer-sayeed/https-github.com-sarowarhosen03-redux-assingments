import { combineReducers } from "redux";
import FlightBookingReducer from "./fligtBooking/FlightBookingReducer";

const rootReducer = combineReducers({
booking:FlightBookingReducer
});

export default rootReducer;
