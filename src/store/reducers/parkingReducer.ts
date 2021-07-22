import { ParkingsActionType } from "../actions/types";
import {
  PARKING_ADD,
  PARKING_UPDATE,
  PARKING_DELETE,
  PARKING_TOGGLE_ACTIVE,
} from "../constants/parkingConstants";
import { ParkingsState } from "../types";

const initialState: ParkingsState = {
  parkings: {},
};

export const parkingsReducer = (
  state = initialState,
  action: ParkingsActionType
): ParkingsState => {
  let newState: ParkingsState = { parkings: {} };
  let parking;

  switch (action.type) {
    case PARKING_ADD:
      parking = action.payload;
      newState = { ...state };
      newState.parkings[parking.id] = parking;
      return newState;
    case PARKING_UPDATE:
      parking = action.payload;
      newState = { ...state };
      newState.parkings[parking.id] = parking;

      return newState;
    case PARKING_TOGGLE_ACTIVE:
      parking = action.payload;
      newState = { ...state };
      newState.parkings[parking.id].isActive =
        !newState.parkings[parking.id].isActive;

      return newState;
    case PARKING_DELETE:
      parking = action.payload;
      newState = {
        ...state,
      };

      delete newState.parkings[parking.id];

      return newState;
    default:
      return state;
  }
};
