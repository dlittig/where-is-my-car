import React, { FC } from "react";

import { View } from "react-native";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button } from "@ui-kitten/components";

import Icons from "../../Icons";
import style from "./Footer.style";
import { routeToLocation } from "../../../utils";
import { ParkingCardFooterComponentType } from "./types";
import { toggleActiveParking } from "../../../store/actions";

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
        onPress={() => routeToLocation(parking.latitude, parking.longitude)}
      >
        {t("actions.navigate") as string}
      </Button>
    </View>
  );
};

export default ParkingCardFooter;
