import React, { FC } from "react";

import { View } from "react-native";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { Avatar, Button, Card } from "react-native-paper";

import Stats from "../Stats";
import MapView from "../MapView";
import style from "./ParkingCard.style";
import { MAP_VIEW_SIZE } from "../MapView/types";
import { deleteParkingAlert } from "../../alerts";
import { ParkingCardComponentType } from "./types";
import { APP_LOCATION_VIEW } from "../Navigator/Routes";
import { humanReadableTime, routeToLocation } from "../../utils";
import { deleteParking, toggleActiveParking } from "../../store/actions";

const LeftAccessoryPaid: FC = (props) => (
  <Avatar.Icon {...props} icon="cash-100" />
);
const LeftAccessoryParked: FC = (props) => (
  <Avatar.Icon {...props} icon="map-marker" />
);

const ParkingCard: FC<ParkingCardComponentType> = ({ parking }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onPress = () =>
    navigation.navigate(
      t(APP_LOCATION_VIEW) as never,
      { id: parking.id } as never
    );

  const confirmDelete = () => {
    deleteParkingAlert(parking.name, () => dispatch(deleteParking(parking)));
  };

  const subtitleProps: Record<string, string> = {};

  if (parking.paid.length > 0)
    subtitleProps.subtitle = `${parking.paid}${parking.unit}`;

  return (
    <View style={style.container}>
      <Card mode="outlined" {...{ onPress, onLongPress: confirmDelete }}>
        <Card.Title
          title={parking.name}
          left={
            parking.paid.length > 0 ? LeftAccessoryPaid : LeftAccessoryParked
          }
          {...subtitleProps}
        />
        <Card.Content>
          <View style={style.mapContainer}>
            <MapView
              mode="passive"
              size={MAP_VIEW_SIZE.CARD}
              latitude={parking.latitude}
              longitude={parking.longitude}
            />
          </View>
          <View style={style.detailsContainer}>
            <Stats hint="Parked" value={humanReadableTime(parking.time)} />
            <Stats
              hint="Reminder"
              value={
                parking.hasReminder
                  ? humanReadableTime(
                      parking.reminderDateTime?.getTime() as number
                    )
                  : "Not set"
              }
            />
            <Stats hint="Photos" value={parking.photos.length} />
          </View>
        </Card.Content>
        <Card.Actions>
          {parking.isActive ? (
            <Button
              compact
              mode="elevated"
              onPress={() => dispatch(toggleActiveParking(parking))}
            >
              {t("actions.stopParking") as string}
            </Button>
          ) : (
            <Button
              compact
              mode="elevated"
              onPress={() => dispatch(toggleActiveParking(parking))}
            >
              {t("actions.startParking") as string}
            </Button>
          )}
          <Button
            compact
            mode="outlined"
            onPress={() => routeToLocation(parking.latitude, parking.longitude)}
          >
            {t("actions.navigate") as string}
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default React.memo(ParkingCard);
