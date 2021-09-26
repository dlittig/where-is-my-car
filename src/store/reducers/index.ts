import { parkingsReducer } from "./parkingReducer";
import { settingsReducer } from "./settingsReducer";
import { ParkingsState, SettingsState } from "../types";

export type RootReducerType = {
  parkingsReducer: ParkingsState;
  settingsReducer: SettingsState;
};

const RootReducer = {
  parkingsReducer,
  settingsReducer,
};

export default RootReducer;
