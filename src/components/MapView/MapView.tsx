import React, { FC, useEffect, useState } from "react";

import { Button } from "@ui-kitten/components";
import { useTranslation } from "react-i18next";
import ReactNativeMapView, { Marker } from "react-native-maps";

import {
  acquireLocation,
  enableLocation,
  requestLocationPermission,
} from "../../utils";
import Icons from "../Icons";
import Skeleton from "./Skeleton";
import NoInteraction from "../NoInteraction";
import style, { mapStyle } from "./MapView.style";
import { MapViewComponentType, MAP_VIEW_SIZE } from "./types";

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
  // useLocationRefresh(mode === "active", 2, 100);
  const { t } = useTranslation();

  useEffect(() => {
    if (
      mode === "active" &&
      longitude &&
      longitude < 0 &&
      latitude &&
      latitude < 0
    ) {
      requestLocationPermission().then((hasPermission) => {
        if (hasPermission) {
          enableLocation().then(() => {
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
          });
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
            style.container,
            size === MAP_VIEW_SIZE.CARD && style.card,
            size === MAP_VIEW_SIZE.NORMAL && style.normal,
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
              style={style.map}
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
          appearance="filled"
          style={style.locateButton}
          accessoryLeft={Icons.Localize}
          onPress={onAcquireLocation}
        >
          {""}
          {/*{t("actions.getLocation") as string}*/}
        </Button>
      )}
    </>
  );
};

export default MapView;
