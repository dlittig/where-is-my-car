import React, { FC } from "react";

import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Button, Card, Text, TopNavigationAction } from "@ui-kitten/components";

import {
  humanReadableDate,
  humanReadableTime,
  routeToLocation,
} from "../../../utils";
import Field from "./Field";
import style from "./LocationView.style";
import List from "../../../components/List";
import Icons from "../../../components/Icons";
import { LocationViewScreenType } from "./types";
import MapView from "../../../components/MapView";
import { deleteParkingAlert } from "../../../alerts";
import { deleteParking } from "../../../store/actions";
import BaseLayout from "../../../components/BaseLayout";
import MainAction from "../../../components/MainAction";
import { RootReducerType } from "../../../store/reducers";
import ImageGallery from "../../../components/ImageGallery";
import { parkingByIdSelector } from "../../../store/selectors";
import { MAP_VIEW_SIZE } from "../../../components/MapView/types";
import { APP_LOCATION_EDIT } from "../../../components/Navigator/Routes";
import BackBar from "../../../components/Navigator/Bars/BackBar/BackBar";

const DeleteAction = (props: any) => (
  <TopNavigationAction icon={Icons.Delete} onPress={props.onPress} />
);

const LocationView: FC<LocationViewScreenType> = ({ route }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const parkingId = route.params ? (route.params["id"] as string) : "";
  const parking = useSelector((state: RootReducerType) =>
    parkingByIdSelector(state, parkingId)
  );

  const onEdit = () => {
    navigation.navigate(t(APP_LOCATION_EDIT), { id: parkingId });
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
            accessoryRight={() => <DeleteAction onPress={confirmDelete} />}
          />
          <BaseLayout level="2">
            <List spacer>
              <View>
                <MapView
                  mode="passive"
                  size={MAP_VIEW_SIZE.NORMAL}
                  latitude={parking.latitude}
                  longitude={parking.longitude}
                />
              </View>

              <Card
                appearance="outline"
                disabled
                style={style.card}
                footer={() => (
                  <View style={style.footer}>
                    <Text category="s1">Details</Text>
                    <View style={style.detailsContainer}>
                      <Button
                        style={style.pill}
                        size="tiny"
                        accessoryLeft={
                          <Icons.CreditCard style={style.icons} fill="#fff" />
                        }
                      >
                        {parking.paid.length > 0
                          ? `${parking.paid}${parking.unit}`
                          : "Free parking"}
                      </Button>

                      {parking.isActive && (
                        <Button
                          style={style.pill}
                          size="tiny"
                          status="success"
                          accessoryLeft={
                            <Icons.Heart style={style.icons} fill="#fff" />
                          }
                        >
                          Active
                        </Button>
                      )}
                    </View>
                  </View>
                )}
              >
                <Text style={style.cardTitle} category="h6">
                  {parking.name}
                </Text>
                <Text style={style.parkedHint} appearance="hint" category="p2">
                  Parked
                </Text>
                <Text style={style.parkedValue} category="h6">
                  {humanReadableTime(parking.time)}
                </Text>
                <Button
                  style={style.cardAction}
                  onPress={() =>
                    routeToLocation(parking.latitude, parking.longitude)
                  }
                  appearance="outline"
                >
                  {t("actions.navigate") as string}
                </Button>
              </Card>

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
                  <Text appearance="hint" style={style.description}>
                    {t("text.location.photosHint") as string}
                  </Text>

                  <View style={style.imageGallery}>
                    <ImageGallery photos={parking.photos} />
                  </View>
                </>
              ) : (
                <Text appearance="hint" style={style.description}>
                  No photos to display.
                </Text>
              )}
            </List>
            <MainAction>
              <Button accessoryLeft={Icons.Edit} onPress={onEdit}>
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
