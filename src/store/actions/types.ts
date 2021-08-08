import { COMMON_RESET_STATE } from "../constants/commonConstants";
import {
  PARKING_ADD,
  PARKING_DELETE,
  PARKING_TOGGLE_ACTIVE,
  PARKING_UPDATE,
} from "../constants/parkingConstants";
import {
  SETTINGS_APPLY_THEME,
  SETTINGS_SEEN_INTRO,
} from "../constants/settingsConstants";
import { Parking } from "../types";

type ApplyThemeAction = {
  type: typeof SETTINGS_APPLY_THEME;
  payload: string;
};

type SeenIntroAction = {
  type: typeof SETTINGS_SEEN_INTRO;
  payload: boolean;
};

export type SettingsActionType = ApplyThemeAction | SeenIntroAction;

export type ParkingsActionType = {
  type:
    | typeof PARKING_ADD
    | typeof PARKING_UPDATE
    | typeof PARKING_DELETE
    | typeof PARKING_TOGGLE_ACTIVE;
  payload: Parking;
};

type CommonResetStateType = {
  type: typeof COMMON_RESET_STATE;
};

export type CommonActionType = CommonResetStateType;
export type ActionType =
  | ParkingsActionType
  | SettingsActionType
  | CommonActionType;
