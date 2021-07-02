import React, { FC } from "react";
import ReactNativeMapView, { Marker } from "react-native-maps";
import NoInteraction from "../NoInteraction";
import { MapViewComponentType, MAP_VIEW_SIZE } from "./types";

import styles, { mapStyle } from "./MapView.style";

const MapView: FC<MapViewComponentType> = ({ size, longitude, latitude }) => (
  <NoInteraction
    condition={size === MAP_VIEW_SIZE.CARD}
    style={[styles.container, size === MAP_VIEW_SIZE.CARD && styles.card]}
  >
    <ReactNativeMapView
      customMapStyle={mapStyle}
      region={{
        latitude,
        longitude,
        latitudeDelta: 0.003,
        longitudeDelta: 0.005,
      }}
      style={styles.map}
    >
      <Marker coordinate={{ latitude, longitude }} pinColor="linen" />
    </ReactNativeMapView>
  </NoInteraction>
);

export default MapView;
