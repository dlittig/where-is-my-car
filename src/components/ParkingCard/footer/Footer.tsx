import React, { FC } from "react";

import { useDispatch } from "react-redux";
import { Button } from "@ui-kitten/components";
import { showLocation } from "react-native-map-link";

import Icons from "../../Icons";
import style from "./Footer.style";
import { ParkingCardFooterComponentType } from "./types";
import { toggleActiveParking } from "../../../store/actions";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

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

const ParkingCardFooter: FC<ParkingCardFooterComponentType> = ({ parking }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <View style={style.footer}>
      {parking.isActive ? (
        <Button
          style={style.button}
          size="small"
          status="basic"
          appearance="ghost"
          accessoryLeft={Icons.Stop}
          onPress={() => dispatch(toggleActiveParking(parking))}
        >
          {t("actions.stopParking") as string}
        </Button>
      ) : (
        <Button
          style={style.button}
          size="small"
          status="basic"
          appearance="ghost"
          accessoryLeft={Icons.Park}
          onPress={() => dispatch(toggleActiveParking(parking))}
        >
          {t("actions.startParking") as string}
        </Button>
      )}
      <Button
        style={style.button}
        size="small"
        appearance="ghost"
        accessoryLeft={Icons.Navigation}
        onPress={() => shareLocation(parking.latitude, parking.longitude)}
      >
        {t("actions.navigate") as string}
      </Button>
    </View>
  );
};

export default ParkingCardFooter;
