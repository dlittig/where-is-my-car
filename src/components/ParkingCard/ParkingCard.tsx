import React, { FC } from "react";
import { Text, Button, Icon } from "@ui-kitten/components";
import BaseCard from "../BaseCard";
import { CARD_TYPE } from "../BaseCard/types";
import MapView from "../MapView";
import { MAP_VIEW_SIZE } from "../MapView/types";
import { ParkingCardComponentType } from "./types";

import style from "./ParkingCard.style";
import { Linking, Share } from "react-native";
import { showLocation } from "react-native-map-link";

const MapIcon = (props: any) => <Icon {...props} name="map-outline" />;

const shareLocation = (latitude: number, longitude: number) => {
  showLocation({
    latitude,
    longitude,
    dialogTitle: "Navigate to your parking", // optional (default: 'Open in Maps')
    dialogMessage: "What app would you like to use?", // optional (default: 'What app would you like to use?')
    cancelText: "Cancel", // optional (default: 'Cancel')
    naverCallerName: "de.dlittig.whereismycar", // to link into Naver Map You should provide your appname which is the bundle ID in iOS and applicationId in android.
  });
};

type ParkingCardFooterComponentType = {
  longitude: number;
  latitude: number;
};

const ParkingCardFooter: FC<ParkingCardFooterComponentType> = ({
  longitude,
  latitude,
}) => (
  <Button
    style={style.button}
    size="small"
    appearance="outline"
    accessoryLeft={MapIcon}
    onPress={() => shareLocation(latitude, longitude)}
  >
    Navigate to...
  </Button>
);

const ParkingCard: FC<ParkingCardComponentType> = ({ parking }) => (
  <BaseCard
    type={CARD_TYPE.INFO}
    appearance="outline"
    footer={() => (
      <ParkingCardFooter
        longitude={parking.longitude}
        latitude={parking.latitude}
      />
    )}
  >
    <MapView
      size={MAP_VIEW_SIZE.CARD}
      latitude={parking.latitude}
      longitude={parking.longitude}
    />
    <BaseCard.Content>
      <Text>{parking.name}</Text>
    </BaseCard.Content>
  </BaseCard>
);

export default ParkingCard;
