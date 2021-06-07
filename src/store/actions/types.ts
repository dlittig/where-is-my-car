import { Parking } from "../reducers/parkingReducer";

interface ParkingActionType {
  type: string;
  payload: Parking;
}

interface SettingsActionType {
  type: string;
  payload?: unknown;
}

export type ActionType = ParkingActionType | SettingsActionType;
