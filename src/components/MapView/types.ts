export enum MAP_VIEW_SIZE {
  CARD = "CARD",
  FULL = "FULL",
  NORMAL = "NORMAL",
}

export type MapViewComponentType = {
  size: MAP_VIEW_SIZE;
  latitude: number;
  longitude: number;
  render?: boolean;
};
