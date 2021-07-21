import React, { FC, ReactElement } from "react";
import ReactNativeMapView, { Marker } from "react-native-maps";
import NoInteraction from "../NoInteraction";
import { MapViewComponentType, MAP_VIEW_SIZE } from "./types";

import styles, { mapStyle } from "./MapView.style";
import Skeleton from "./Skeleton";
import { useEffect } from "react";
import { useState } from "react";

const MapView: FC<MapViewComponentType> = ({
  size,
  longitude,
  latitude,
  render,
}) => {
  const [showSkeleton, setShowSkeleton] = useState<boolean>(true);

  useEffect(() => {
    if (longitude !== 0 && latitude !== 0 && render === true) {
      // Show skeleton at least 1 sec if not toggled via render prop
      // TODO: move permission and location acquisition to hook
      // TODO: map view controls skeleton in case location is default (0,0)
      setShowSkeleton(true);
    }
  }, [longitude, latitude, render]);

  return (
    <NoInteraction
      condition={size !== MAP_VIEW_SIZE.FULL}
      style={[
        styles.container,
        size === MAP_VIEW_SIZE.CARD && styles.card,
        size === MAP_VIEW_SIZE.NORMAL && styles.normal,
      ]}
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
};

export default MapView;
