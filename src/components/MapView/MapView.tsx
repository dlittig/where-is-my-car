import React, { FC, ReactElement } from "react";
import ReactNativeMapView, { Marker } from "react-native-maps";
import NoInteraction from "../NoInteraction";
import { MapViewComponentType, MAP_VIEW_SIZE } from "./types";

import styles, { mapStyle } from "./MapView.style";
import Skeleton from "./Skeleton";
import { useEffect } from "react";
import { useState } from "react";
import { acquireLocation } from "../../utils";
import { CONFIGURATION } from "../../config";
import { Button } from "@ui-kitten/components";
import Icons from "../Icons";

const MapView: FC<MapViewComponentType> = ({
  size,
  mode,
  longitude,
  latitude,
  withAction,
  onLocationAcquisition,
}) => {
  const [showSkeleton, setShowSkeleton] = useState<boolean>(true);
  const [coordinatesLong, setCoordinatesLong] = useState(longitude);
  const [coordinatesLat, setCoordinatesLat] = useState(latitude);

  useEffect(() => {
    if (mode === "active") {
      acquireLocation().then((location) => {
        if (location && onLocationAcquisition) {
          setCoordinatesLong(location.coords.longitude);
          setCoordinatesLat(location.coords.latitude);
          onLocationAcquisition(location);

          setShowSkeleton(false);
        } else {
          setCoordinatesLong(0);
          setCoordinatesLat(0);
        }
      });
    } else {
      setShowSkeleton(false);
    }
  }, []);

  const onAcquireLocation = async () => {
    const location = await acquireLocation();

    if (location && onLocationAcquisition) {
      setCoordinatesLong(location.coords.longitude);
      setCoordinatesLat(location.coords.latitude);
      onLocationAcquisition(location);
    }
  };

  return (
    <>
      <Skeleton isLoading={showSkeleton}>
        <NoInteraction
          condition={size !== MAP_VIEW_SIZE.FULL}
          style={[
            styles.container,
            size === MAP_VIEW_SIZE.CARD && styles.card,
            size === MAP_VIEW_SIZE.NORMAL && styles.normal,
          ]}
        >
          {coordinatesLong && coordinatesLat && (
            <ReactNativeMapView
              customMapStyle={mapStyle}
              region={{
                latitude: coordinatesLat,
                longitude: coordinatesLong,
                latitudeDelta: 0.003,
                longitudeDelta: 0.005,
              }}
              style={styles.map}
            >
              <Marker
                coordinate={{
                  latitude: coordinatesLat,
                  longitude: coordinatesLong,
                }}
                pinColor="linen"
              />
            </ReactNativeMapView>
          )}
        </NoInteraction>
      </Skeleton>
      {withAction && (
        <Button
          status="primary"
          accessoryLeft={Icons.Localize}
          onPress={onAcquireLocation}
        >
          Get location
        </Button>
      )}
    </>
  );
};

export default MapView;
