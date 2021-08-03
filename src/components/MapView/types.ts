import * as Location from "expo-location";

export enum MAP_VIEW_SIZE {
  CARD = "CARD",
  FULL = "FULL",
  NORMAL = "NORMAL",
}

export type MapViewComponentType = {
  size: MAP_VIEW_SIZE;
  mode: "active" | "passive";
  withAction?: boolean;
  latitude?: number;
  longitude?: number;
  onLocationAcquisition?: (location: Location.LocationObject) => void;
};
