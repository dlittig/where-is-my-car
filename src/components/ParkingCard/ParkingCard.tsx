import React, { FC } from "react";
import { Text, Layout } from "@ui-kitten/components";
import ParkingCardFooter from "./footer";
import MapView from "../MapView";
import BaseCard from "../BaseCard";
import { CARD_TYPE } from "../BaseCard/types";
import { MAP_VIEW_SIZE } from "../MapView/types";
import { ParkingCardComponentType } from "./types";
import { humanReadableTime } from "../../utils";

import style from "./ParkingCard.style";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { APP_LOCATION_VIEW } from "../Navigator/Routes";
import Icons from "../Icons";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { deleteParking } from "../../store/actions";

const ParkingCard: FC<ParkingCardComponentType> = ({ parking }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const shouldShake = () =>
    parking.reminderTime && parking.reminderTime < Date.now();

  const onPress = () =>
    navigation.navigate(t(APP_LOCATION_VIEW), { id: parking.id });

  const confirmDelete = () => {
    Alert.alert(
      "Delete parking",
      `Are you sure you want to delete parking "${parking.name}"?`,
      [
        {
          text: "Cancel",
          onPress: () => undefined,
          style: "cancel",
        },
        {
          text: "Okay",
          onPress: () => {
            dispatch(deleteParking(parking));
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <BaseCard
      type={CARD_TYPE.INFO}
      appearance="outline"
      footer={() => (
        <ParkingCardFooter
          longitude={parking.longitude}
          latitude={parking.latitude}
        />
      )}
      touchableOpacityProps={{ onPress, onLongPress: confirmDelete }}
    >
      <MapView
        size={MAP_VIEW_SIZE.CARD}
        latitude={parking.latitude}
        longitude={parking.longitude}
      />
      <BaseCard.Content>
        <Text category="h6" style={style.parkingName}>
          {parking.name}
        </Text>
        <Layout style={style.detailsContainer}>
          <Text style={style.detailsItems}>
            <Icons.CreditCard style={style.icons} fill="#fff" />
            {`${parking.unit} ${parking.paid}`}
          </Text>
          <Text style={[style.detailsItems]}>
            <Icons.Localize style={style.icons} fill="#fff" />
            {humanReadableTime(parking.time)}
          </Text>
          {parking.hasReminder && (
            <Text style={style.detailsItems}>
              <Icons.Clock
                style={style.icons}
                animation={shouldShake() ? "shake" : undefined}
                fill="#fff"
              />
              {humanReadableTime(parking.reminderTime as number)}
            </Text>
          )}
        </Layout>
      </BaseCard.Content>
    </BaseCard>
  );
};

export default ParkingCard;
