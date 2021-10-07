import { AppActionType, CommonActionType } from "../actions/types";
import {
  APP_INCREASE_CURRENT_LIMIT,
  APP_SEARCH,
} from "../constants/appConstants";
import { COMMON_RESET_STATE } from "../constants/commonConstants";
import { AppState } from "../types";

const INCREASE_LIMIT_AMOUNT = 10;

const initialState: AppState = {
  search: "",
  currentLimit: 10,
};

export const appReducer = (
  state = initialState,
  action: AppActionType | CommonActionType
): AppState => {
  let newState = {} as AppState;
  let search: string;

  switch (action.type) {
    case APP_SEARCH:
      search = action.payload;
      newState = { ...state };

      newState.search = search;
      return newState;
    case APP_INCREASE_CURRENT_LIMIT:
      newState = { ...state };

      newState.currentLimit = state.currentLimit + INCREASE_LIMIT_AMOUNT;
      return newState;
    case COMMON_RESET_STATE:
      return initialState;
    default:
      return state;
  }
};
