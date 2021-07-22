import {
  PARKING_ADD,
  PARKING_DELETE,
  PARKING_TOGGLE_ACTIVE,
  PARKING_UPDATE,
} from "../constants/parkingConstants";
import { SETTINGS_APPLY_THEME } from "../constants/settingsConstants";
import { Parking } from "../types";

type ApplyThemeAction = {
  type: typeof SETTINGS_APPLY_THEME;
  payload: "light" | "dark";
};

export type SettingsActionType = ApplyThemeAction;

export type ParkingsActionType = {
  type:
    | typeof PARKING_ADD
    | typeof PARKING_UPDATE
    | typeof PARKING_DELETE
    | typeof PARKING_TOGGLE_ACTIVE;
  payload: Parking;
};
export type ActionType = ParkingsActionType | SettingsActionType;
