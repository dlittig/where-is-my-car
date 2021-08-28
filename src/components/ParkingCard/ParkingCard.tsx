import React, { FC } from "react";

import { View } from "react-native";
import { useDispatch } from "react-redux";
import { Text } from "@ui-kitten/components";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

import Icons from "../Icons";
import MapView from "../MapView";
import BaseCard from "../BaseCard";
import style from "./ParkingCard.style";
import ParkingCardFooter from "./footer";
import { CARD_TYPE } from "../BaseCard/types";
import { humanReadableTime } from "../../utils";
import { MAP_VIEW_SIZE } from "../MapView/types";
import { ParkingCardComponentType } from "./types";
import { deleteParking } from "../../store/actions";
import { APP_LOCATION_VIEW } from "../Navigator/Routes";
import { deleteParkingAlert } from "../../alerts";

const ParkingCard: FC<ParkingCardComponentType> = ({ parking }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  console.log("Parking", parking, typeof parking.reminderDateTime);

  const shouldShake = () =>
    parking.reminderDateTime &&
    parking.reminderDateTime?.getTime() < Date.now();

  const cardType = () => {
    if (parking.isActive) {
      if (
        parking.reminderDateTime &&
        parking.reminderDateTime?.getTime() < Date.now()
      ) {
        return CARD_TYPE.WARNING;
      } else {
        return CARD_TYPE.SUCCESS;
      }
    } else {
      return CARD_TYPE.BASIC;
    }
  };

  const onPress = () =>
    navigation.navigate(t(APP_LOCATION_VIEW), { id: parking.id });

  const confirmDelete = () => {
    deleteParkingAlert(parking.name, () => dispatch(deleteParking(parking)));
  };

  return (
    <View style={style.container}>
      <BaseCard
        type={cardType()}
        appearance="outline"
        footer={() => <ParkingCardFooter parking={parking} />}
        touchableOpacityProps={{ onPress, onLongPress: confirmDelete }}
      >
        <MapView
          mode="passive"
          size={MAP_VIEW_SIZE.CARD}
          latitude={parking.latitude}
          longitude={parking.longitude}
        />
        <BaseCard.Content>
          <Text category="h6" style={style.parkingName}>
            {parking.name}
          </Text>
          <View style={style.detailsContainer}>
            <Text style={style.detailsItems}>
              <Icons.CreditCard style={style.icons} fill="#fff" />
              {`${parking.unit} ${parking.paid || "./."}`}
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
                {humanReadableTime(
                  parking.reminderDateTime?.getTime() as number
                )}
              </Text>
            )}
          </View>
        </BaseCard.Content>
      </BaseCard>
    </View>
  );
};

export default React.memo(ParkingCard);
