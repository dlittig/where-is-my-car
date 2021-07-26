import { RootReducerType } from "../reducers";
import { ParkingsState, SettingsState } from "../types";

export const parkingsSelector = (state: RootReducerType): ParkingsState =>
  state.parkingsReducer;

export const settingsSelector = (state: RootReducerType): SettingsState =>
  state.settingsReducer;
