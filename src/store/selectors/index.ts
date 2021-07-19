import { RootReducerType } from "../reducers";
import { ParkingsState } from "../reducers/parkingReducer";

export const parkingsSelector = (state: RootReducerType): ParkingsState =>
    state.parkingsReducer;
