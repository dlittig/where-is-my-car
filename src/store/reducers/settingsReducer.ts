import { SettingsActionType } from "../actions/types";
import {
  SETTINGS_APPLY_THEME,
  SETTINGS_SEEN_INTRO,
} from "../constants/settingsConstants";
import { SettingsState } from "../types";

const initialState: SettingsState = {
  theme: "dark",
  introSeen: false,
  locationPermission: false,
  locationPermissionAskAgain: true,
  imagePermission: false,
  imagePermissionAskAgain: true,
};

export const settingsReducer = (
  state = initialState,
  action: SettingsActionType
): SettingsState => {
  let newState = {} as SettingsState;
  let theme;
  let seen;

  switch (action.type) {
    case SETTINGS_APPLY_THEME:
      theme = action.payload;
      newState = { ...state, theme };

      return newState;
    case SETTINGS_SEEN_INTRO:
      seen = action.payload;
      newState = { ...state, introSeen: seen };

      return newState;
    default:
      return state;
  }
};
