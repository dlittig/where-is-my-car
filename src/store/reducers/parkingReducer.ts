import { CommonActionType, ParkingsActionType } from "../actions/types";
import { COMMON_RESET_STATE } from "../constants/commonConstants";
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
  action: ParkingsActionType | CommonActionType
): ParkingsState => {
  let newState = {} as ParkingsState;
  let parking: Parking;

  switch (action.type) {
    case PARKING_ADD:
      parking = action.payload;
      newState = { ...state };
      // Add to overall list of parkings
      newState.parkings.byId[parking.id] = parking;

      // Add to list and sort
      newState.parkings.allIds.push(parking.id);
      newState.sortedParkings.push(parking.id);
      newState.sortedParkings.sort(
        (a, b) =>
          newState.parkings.byId[b].time - newState.parkings.byId[a].time
      );

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
      newState = { ...state };

      newState.parkings.allIds = newState.parkings.allIds.filter(
        (item) => item !== parking.id
      );
      newState.sortedParkings = newState.sortedParkings.filter(
        (item) => item !== parking.id
      );
      delete newState.parkings.byId[parking.id];

      return newState;
    case COMMON_RESET_STATE:
      return initialState;
    default:
      return state;
  }
};
