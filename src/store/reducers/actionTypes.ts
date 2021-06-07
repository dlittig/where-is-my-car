import {
  PARKING_DELETE,
  PARKING_UPDATE,
  PARKING_ADD,
} from "../constants/parkingConstants";
import {
  SETTINGS_APPLY_THEME,
  SETTINGS_SEEN_TIP_FASTEST,
} from "../constants/settingsConstants";
import { Parking } from "./parkingReducer";

type ApplyThemeAction = {
  type: typeof SETTINGS_APPLY_THEME;
  payload: "light" | "dark";
};

type SeenTipFastestAction = {
  type: typeof SETTINGS_SEEN_TIP_FASTEST;
};

export type SettingsActionType = ApplyThemeAction | SeenTipFastestAction;

export type ParkingsActionType = {
  type: typeof PARKING_ADD | typeof PARKING_UPDATE | typeof PARKING_DELETE;
  payload: Parking;
};
