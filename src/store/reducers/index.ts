import { parkingsReducer } from "./parkingReducer";
import { settingsReducer } from "./settingsReducer";
import { appReducer } from "./appReducer";
import { AppState, ParkingsState, SettingsState } from "../types";

export type RootReducerType = {
  parkingsReducer: ParkingsState;
  settingsReducer: SettingsState;
  appReducer: AppState;
};

export const RootReducer = {
  parkingsReducer,
  settingsReducer,
  appReducer,
};

export default RootReducer;
