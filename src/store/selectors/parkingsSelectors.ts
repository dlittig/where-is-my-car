import createCachedSelector from "re-reselect";
import { RootReducerType } from "../reducers";
import { Parking, ParkingsState } from "../types";

const parkingsSelector = (state: RootReducerType): ParkingsState =>
  state.parkingsReducer;

const parkingId = (state: RootReducerType, id: string): string => id;

export const parkingsAllSelector = createCachedSelector(
  parkingsSelector,
  (parkingsReducer) =>
    parkingsReducer.parkings.allIds.map(
      (id) => parkingsReducer.parkings.byId[id]
    )
)((_state_) => "parkings.allIds");

export const parkingsAllSortedSelector = createCachedSelector(
  parkingsSelector,
  (parkingsReducer) =>
    parkingsReducer.sortedParkings.map(
      (id) => parkingsReducer.parkings.byId[id]
    )
)((_state_) => "parkings.sortedParkings");

export const parkingsActiveSortedSelector = createCachedSelector(
  parkingsAllSortedSelector,
  (parkings) => parkings.filter((parking) => parking.isActive)
)((_state_) => "parkings.sortedParkings.active");

export const parkingsInactiveSortedSelector = createCachedSelector(
  parkingsAllSortedSelector,
  (parkings) => parkings.filter((parking) => !parking.isActive)
)((_state_) => "parkings.sortedParkings.inactive");

export const parkingByIdSelector = createCachedSelector(
  parkingsSelector,
  parkingId,
  (parkingsReducer, id) => parkingsReducer.parkings.byId[id]
)((_state_, id) => id);
