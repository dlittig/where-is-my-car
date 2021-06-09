import {
  PARKING_ADD,
  PARKING_DELETE,
  PARKING_UPDATE,
} from "../constants/parkingConstants";
import { SETTINGS_APPLY_THEME } from "../constants/settingsConstants";
import { Parking } from "../reducers/parkingReducer";

type ApplyThemeAction = {
  type: typeof SETTINGS_APPLY_THEME;
  payload: "light" | "dark";
};

export type SettingsActionType = ApplyThemeAction;

export type ParkingsActionType = {
  type: typeof PARKING_ADD | typeof PARKING_UPDATE | typeof PARKING_DELETE;
  payload: Parking;
};
export type ActionType = ParkingsActionType | SettingsActionType;
