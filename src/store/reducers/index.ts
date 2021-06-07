import { parkingsReducer, ParkingsState } from "./parkingReducer";
import { SettingsState, settingsReducer } from "./settingsReducer";

export type RootReducerType = {
  parkingsReducer: ParkingsState;
  settingsReducer: SettingsState;
};

const RootReducer = {
  parkingsReducer,
  settingsReducer,
};

export default RootReducer;
