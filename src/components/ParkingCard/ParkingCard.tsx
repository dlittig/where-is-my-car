import React, { FC } from "react";
import { Text, Icon, Layout } from "@ui-kitten/components";
import ParkingCardFooter from "./footer";
import MapView from "../MapView";
import BaseCard from "../BaseCard";
import { CARD_TYPE } from "../BaseCard/types";
import { MAP_VIEW_SIZE } from "../MapView/types";
import { ParkingCardComponentType } from "./types";
import { humanReadableTime, humanReadableMoney } from "../../utils";

import style from "./ParkingCard.style";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { APP_LOCATION_EDIT } from "../Navigator/Routes";
import { TouchableNativeFeedback, TouchableOpacity } from "react-native";

const ParkingCard: FC<ParkingCardComponentType> = ({ parking }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const shouldShake = () =>
    parking.reminderTime && parking.reminderTime < Date.now();

  const onPress = () => {
    console.log("press");
    navigation.navigate(t(APP_LOCATION_EDIT));
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
      touchableOpacityProps={{ onPress }}
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
            <Icon style={style.icons} fill="#fff" name="credit-card-outline" />
            {humanReadableMoney(parking.paid, parking.unit)}
          </Text>
          <Text style={[style.detailsItems]}>
            <Icon style={style.icons} fill="#fff" name="pin-outline" />
            {humanReadableTime(parking.time)}
          </Text>
          {parking.reminderTime && (
            <Text style={style.detailsItems}>
              <Icon
                style={style.icons}
                animation={shouldShake() ? "shake" : undefined}
                fill="#fff"
                name="clock-outline"
              />
              {humanReadableTime(parking.reminderTime)}
            </Text>
          )}
        </Layout>
      </BaseCard.Content>
    </BaseCard>
  );
};

export default ParkingCard;
