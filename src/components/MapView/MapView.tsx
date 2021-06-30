import React, { FC } from "react";
import ReactNativeMapView from "react-native-maps";
import NoInteraction from "../NoInteraction";
import { MapViewComponentType, MAP_VIEW_SIZE } from "./types";

import styles, { mapStyle } from "./MapView.style";

const MapView: FC<MapViewComponentType> = ({ size, children }) => {
  //   let mapProps = {};

  //   if (size === MAP_VIEW_SIZE.CARD) {
  //     mapProps = {
  //       zoomEnabled: false,
  //       zoomTabEnabled: false,
  //       pitchEnabled: false,
  //       rotateEnabled: false,
  //       toolbarEnabled: false,
  //     };
  //   }

  //   console.log(mapProps);

  return (
    <NoInteraction
      condition={size === MAP_VIEW_SIZE.CARD}
      style={styles.container}
    >
      <ReactNativeMapView
        // {...mapProps}
        customMapStyle={mapStyle}
        style={styles.map}
      >
        {children}
      </ReactNativeMapView>
    </NoInteraction>
  );
};

export default MapView;
