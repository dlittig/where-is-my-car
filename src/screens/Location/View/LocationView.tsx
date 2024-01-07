import React, { FC } from "react";

import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Appbar, Button, Chip, Text } from "react-native-paper";

import {
  humanReadableDate,
  humanReadableTime,
  routeToLocation,
} from "../../../utils";
import Field from "./Field";
import style from "./LocationView.style";
import List from "../../../components/List";
import { LocationViewScreenType } from "./types";
import MapView from "../../../components/MapView";
import BaseCard from "../../../components/BaseCard";
import { deleteParkingAlert } from "../../../alerts";
import { deleteParking } from "../../../store/actions";
import BaseLayout from "../../../components/BaseLayout";
import MainAction from "../../../components/MainAction";
import { RootReducerType } from "../../../store/reducers";
import ImageGallery from "../../../components/ImageGallery";
import { parkingByIdSelector } from "../../../store/selectors";
import BackBar from "../../../components/Navigator/Bars/BackBar";
import { MAP_VIEW_SIZE } from "../../../components/MapView/types";
import { APP_LOCATION_EDIT } from "../../../components/Navigator/Routes";

const LocationView: FC<LocationViewScreenType> = ({ route }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const parkingId = route.params ? (route.params["id"] as string) : "";
  const parking = useSelector((state: RootReducerType) =>
    parkingByIdSelector(state, parkingId)
  );

  const onEdit = () => {
    navigation.navigate(
      ...([t(APP_LOCATION_EDIT), { id: parkingId }] as never)
    );
  };

  const confirmDelete = () => {
    deleteParkingAlert(parking.name, () => {
      navigation.goBack();
      dispatch(deleteParking(parking));
    });
  };

  return (
    <>
      {parking && (
        <>
          <BackBar
            title={route.name}
            accessoryRight={
              <Appbar.Action icon="delete-outline" onPress={confirmDelete} />
            }
          />
          <BaseLayout>
            <List spacer>
              <View>
                <MapView
                  mode="passive"
                  size={MAP_VIEW_SIZE.NORMAL}
                  latitude={parking.latitude}
                  longitude={parking.longitude}
                />
              </View>

              <BaseCard
                appearance="elevated"
                cardStyle={style.card}
                contentStyle={style.cardContent}
                footer={
                  <View style={style.footer}>
                    <Text variant="titleMedium">Details</Text>
                    <View style={style.detailsContainer}>
                      <Chip icon="credit-card-outline" style={style.chip}>
                        {parking.paid.length > 0
                          ? `${parking.paid}${parking.unit}`
                          : "Free parking"}
                      </Chip>

                      {parking.isActive && (
                        <Chip icon="heart" style={style.chip} mode="outlined">
                          Active
                        </Chip>
                      )}
                    </View>
                  </View>
                }
              >
                <Text style={style.cardTitle} variant="titleLarge">
                  {parking.name}
                </Text>
                <Text style={style.parkedHint} variant="titleMedium">
                  Parked
                </Text>
                <Text style={style.parkedValue} variant="bodyMedium">
                  {humanReadableTime(parking.time)}
                </Text>
                <Button
                  style={style.cardAction}
                  onPress={() =>
                    routeToLocation(parking.latitude, parking.longitude)
                  }
                  mode="contained-tonal"
                >
                  {t("actions.navigate") as string}
                </Button>
              </BaseCard>

              <Field
                description={t("text.location.reminder")}
                content={
                  parking.hasReminder
                    ? `A reminder has been set for ${humanReadableDate(
                        parking.reminderDateTime?.getTime() as number
                      )} at ${humanReadableTime(
                        parking.reminderDateTime?.getTime() as number
                      )}.`
                    : "No reminder has been set"
                }
              />

              <Field
                description={t("text.location.notes")}
                content={
                  parking.notes.length > 0
                    ? parking.notes
                    : "No notes have been added."
                }
              />

              <Field description={t("text.location.photos")} content="" />

              {parking.photos.length > 0 ? (
                <>
                  <Text variant="bodyMedium" style={style.description}>
                    {t("text.location.photosHint") as string}
                  </Text>

                  <View style={style.imageGallery}>
                    <ImageGallery photos={parking.photos} />
                  </View>
                </>
              ) : (
                <Text variant="bodyMedium" style={style.description}>
                  No photos to display.
                </Text>
              )}
            </List>
            <MainAction>
              <Button mode="contained" icon="pencil" onPress={onEdit}>
                {t("actions.edit").toUpperCase()}
              </Button>
            </MainAction>
          </BaseLayout>
        </>
      )}
    </>
  );
};

export default LocationView;
