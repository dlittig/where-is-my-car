import { APP_INCREASE_CURRENT_LIMIT, APP_SEARCH } from "../constants/appConstants";
import { ActionType } from "./types";

export const searchParking = (search: string): ActionType => ({
  type: APP_SEARCH,
  payload: search,
});

export const increaseCurrentLimit = (): ActionType => ({
  type: APP_INCREASE_CURRENT_LIMIT,
});
