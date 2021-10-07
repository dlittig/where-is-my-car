import { parkingsReducer } from "./parkingReducer";
import { settingsReducer } from "./settingsReducer";
import { ParkingsState, SettingsState } from "../types";

export type RootReducerType = {
  parkingsReducer: ParkingsState;
  settingsReducer: SettingsState;
};

export const RootReducer = {
  parkingsReducer,
  settingsReducer,
};
