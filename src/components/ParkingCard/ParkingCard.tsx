import React, { FC } from "react";

import { View } from "react-native";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { Button, Layout, Text } from "@ui-kitten/components";

import Icons from "../Icons";
import Stats from "../Stats";
import MapView from "../MapView";
import BaseCard from "../BaseCard";
import style from "./ParkingCard.style";
import ParkingCardFooter from "./footer";
import { humanReadableTime } from "../../utils";
import { MAP_VIEW_SIZE } from "../MapView/types";
import { deleteParkingAlert } from "../../alerts";
import { ParkingCardComponentType } from "./types";
import { deleteParking } from "../../store/actions";
import { APP_LOCATION_VIEW } from "../Navigator/Routes";

const ParkingCard: FC<ParkingCardComponentType> = ({ parking }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onPress = () =>
    navigation.navigate(t(APP_LOCATION_VIEW), { id: parking.id });

  const confirmDelete = () => {
    deleteParkingAlert(parking.name, () => dispatch(deleteParking(parking)));
  };

  return (
    <View style={style.container}>
      <BaseCard
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
          <Layout style={style.header} level="2">
            <Text category="h6" style={style.parkingName}>
              {parking.name}
            </Text>
            {parking.paid.length > 0 && (
              <Button
                style={style.paidButton}
                size="tiny"
                accessoryLeft={
                  <Icons.CreditCard style={style.icons} fill="#fff" />
                }
              >
                {`${parking.paid}${parking.unit}`}
              </Button>
            )}
          </Layout>
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
        </BaseCard.Content>
      </BaseCard>
    </View>
  );
};

export default React.memo(ParkingCard);
