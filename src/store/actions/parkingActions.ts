import {
  PARKING_ADD,
  PARKING_DELETE,
  PARKING_UPDATE,
  PARKING_TOGGLE_ACTIVE,
  PARKING_SEARCH,
  PARKING_INCREASE_CURRENT_LIMIT,
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

export const searchParking = (search: string): ActionType => ({
  type: PARKING_SEARCH,
  payload: search,
});

export const increaseCurrentLimit = (): ActionType => ({
  type: PARKING_INCREASE_CURRENT_LIMIT,
});
