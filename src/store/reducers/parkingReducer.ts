import { ParkingsActionType } from "../actions/types";
import {
  PARKING_ADD,
  PARKING_UPDATE,
  PARKING_DELETE,
  PARKING_TOGGLE_ACTIVE,
} from "../constants/parkingConstants";
import { Parking, ParkingsState } from "../types";

const initialState: ParkingsState = {
  parkings: {
    byId: {},
    allIds: [],
  },
  sortedParkings: [],
};

export const parkingsReducer = (
  state = initialState,
  action: ParkingsActionType
): ParkingsState => {
  let newState = {} as ParkingsState;
  let parking: Parking;
  console.log("state", state, action);

  switch (action.type) {
    case PARKING_ADD:
      parking = action.payload;
      newState = { ...state };
      console.log("adding to ids")
      // Add to overall list of parkings
      newState.parkings.byId[parking.id] = parking;

      // Add to list and sort
      console.log("adding to lists")
      newState.parkings.allIds.push(parking.id);
      newState.sortedParkings.push(parking.id);
      newState.sortedParkings.sort(
        (a, b) =>
          newState.parkings.byId[b].time - newState.parkings.byId[a].time
      );
      console.log("new state!", newState);

      return newState;
    case PARKING_UPDATE:
      parking = action.payload;
      newState = { ...state };
      newState.parkings.byId[parking.id] = parking;

      return newState;
    case PARKING_TOGGLE_ACTIVE:
      parking = action.payload;
      newState = { ...state };
      newState.parkings.byId[parking.id].isActive =
        !newState.parkings.byId[parking.id].isActive;

      return newState;
    case PARKING_DELETE:
      parking = action.payload;
      newState = {
        ...state,
      };

      newState.parkings.allIds = newState.parkings.allIds.filter(
        (item) => item !== parking.id
      );
      newState.sortedParkings = newState.sortedParkings.filter(
        (item) => item !== parking.id
      );
      delete newState.parkings.byId[parking.id];

      return newState;
    default:
      return state;
  }
};
