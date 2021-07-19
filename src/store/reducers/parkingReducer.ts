import { ParkingsActionType } from "../actions/types";
import {
  PARKING_ADD,
  PARKING_UPDATE,
  PARKING_DELETE,
} from "../constants/parkingConstants";

export type PaymentUnitType = "$" | "€" | "CHF" | "¥" | "£";

export type Parking = {
  id: string;
  name: string;
  time: number;
  reminderTime?: number;
  car: string;
  paid: string;
  longitude: number;
  latitude: number;
  locationName: string;
  photos: string[];
  unit: PaymentUnitType;
  [k: string]: unknown;
};

export type ParkingsState = {
  parkings: {
    [x: string]: Parking;
  };
};

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
