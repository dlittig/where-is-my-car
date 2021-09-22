import React, { FC, useEffect, useState } from "react";

import { Button } from "@ui-kitten/components";
import { useTranslation } from "react-i18next";
import ReactNativeMapView, { Marker } from "react-native-maps";

import Icons from "../Icons";
import Skeleton from "./Skeleton";
import NoInteraction from "../NoInteraction";
import { acquireLocation, enableLocation } from "../../utils";
import styles, { mapStyle } from "./MapView.style";
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
  const { t } = useTranslation();

  useEffect(() => {
    console.log("On mount", longitude, latitude);
    if (
      mode === "active" &&
      longitude &&
      longitude < 0 &&
      latitude &&
      latitude < 0
    ) {
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
          appearance="filled"
          style={{
            width: 48,
            height: 48,
            borderRadius: 30,
            marginRight: 10,
            marginTop: -60,
            marginBottom: 30,
            alignSelf: "flex-end",
          }}
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
