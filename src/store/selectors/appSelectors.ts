import { createCachedSelector } from "re-reselect";
import { RootReducerType } from "../reducers";
import { AppState } from "../types";

const appSelector = (state: RootReducerType): AppState => state.appReducer;

export const appSearchFilterSelector = createCachedSelector(
  appSelector,
  (appReducer) => appReducer.search
)((_state_) => "app.search");

export const appLimitSelector = createCachedSelector(
  appSelector,
  (appReducer) => appReducer.currentLimit
)((_state_) => "app.currentLimit");
