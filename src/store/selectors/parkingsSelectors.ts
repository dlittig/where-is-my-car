import createCachedSelector from "re-reselect";
import { searchFilter } from "../../utils";
import { RootReducerType } from "../reducers";
import { parkingsReducer } from "../reducers/parkingReducer";
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
)((_state_, id) => `parkings.byId[${id}]`);

export const parkingSearchFilterSelector = createCachedSelector(
  parkingsSelector,
  (parkingsReducer) => parkingsReducer.search
)((_state_) => "parkings.search");

export const parkingLimitSelector = createCachedSelector(
  parkingsSelector,
  (parkingsReducer) => parkingsReducer.currentLimit
)((_state_) => "parkings.currentLimit");

export const parkingFilteredPaginatedSelector = createCachedSelector(
  parkingsInactiveSortedSelector,
  parkingSearchFilterSelector,
  parkingLimitSelector,
  (inactiveParkings, search, currentLimit) =>
    inactiveParkings
      .filter((value) => searchFilter(value, search))
      .slice(0, currentLimit + 1)
)((_state) => "parkings.filtered.paginated");
