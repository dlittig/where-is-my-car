import { RootReducerType } from "../reducers";
import { SettingsState } from "../types";

export const settingsSelector = (state: RootReducerType): SettingsState =>
  state.settingsReducer;
