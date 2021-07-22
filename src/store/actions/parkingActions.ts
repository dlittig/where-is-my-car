import {
  PARKING_ADD,
  PARKING_DELETE,
  PARKING_UPDATE,
  PARKING_TOGGLE_ACTIVE,
} from "../constants/parkingConstants";
import { Parking } from "../types";
import { ActionType } from "./types";

export const addParking = (parking: Parking): ActionType => ({
  type: PARKING_ADD,
  payload: parking,
});

export const deleteParking = (parking: Parking): ActionType => ({
  type: PARKING_DELETE,
  payload: parking,
});

export const updateParking = (parking: Parking): ActionType => ({
  type: PARKING_UPDATE,
  payload: parking,
});

export const toggleActiveParking = (parking: Parking): ActionType => ({
  type: PARKING_TOGGLE_ACTIVE,
  payload: parking,
});
