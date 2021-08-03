import { ParkingsActionType } from "../actions/types";
import {
  PARKING_ADD,
  PARKING_UPDATE,
  PARKING_DELETE,
  PARKING_TOGGLE_ACTIVE,
} from "../constants/parkingConstants";
import { Parking, ParkingsState } from "../types";

const initialState: ParkingsState = {
  parkings: {},
  sortedParkings: [],
};

export const parkingsReducer = (
  state = initialState,
  action: ParkingsActionType
): ParkingsState => {
  let newState = {} as ParkingsState;
  let parking: Parking;

  switch (action.type) {
    case PARKING_ADD:
      parking = action.payload;
      newState = { ...state };
      // Add to overall list of parkings
      newState.parkings[parking.id] = parking;

      // Add to list and sort
      newState.sortedParkings.push(parking.id);
      newState.sortedParkings.sort(
        (a, b) => newState.parkings[b].time - newState.parkings[a].time
      );

      return newState;
    case PARKING_UPDATE:
      parking = action.payload;
      newState = { ...state };
      newState.parkings[parking.id] = parking;

      return newState;
    case PARKING_TOGGLE_ACTIVE:
      console.log("old", state);
      parking = action.payload;
      newState = { ...state };
      newState.parkings[parking.id].isActive =
        !newState.parkings[parking.id].isActive;

      console.log("new", newState);
      return newState;
    case PARKING_DELETE:
      parking = action.payload;
      newState = {
        ...state,
      };

      newState.sortedParkings = newState.sortedParkings.filter(
        (item) => item !== parking.id
      );
      delete newState.parkings[parking.id];

      return newState;
    default:
      return state;
  }
};
