import {
  PARKING_ADD,
  PARKING_DELETE,
  PARKING_UPDATE,
} from "../constants/parkingConstants";
import { Parking } from "../reducers/parkingReducer";
import { ActionType } from "./types";

export const addDriver = (parking: Parking): ActionType => ({
  type: PARKING_ADD,
  payload: parking,
});

export const deleteDriver = (parking: Parking): ActionType => ({
  type: PARKING_DELETE,
  payload: parking,
});

export const updateDriver = (parking: Parking): ActionType => ({
  type: PARKING_UPDATE,
  payload: parking,
});
