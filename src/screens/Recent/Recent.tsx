import React from "react";
import { Button, Icon, Text } from "@ui-kitten/components";
import BaseLayout from "../../components/BaseLayout/BaseLayout";
import MainAction from "../../components/MainAction";
import List from "../../components/List";
import ParkingCard from "../../components/ParkingCard";
import { ParkingsState } from "../../store/reducers/parkingReducer";
import { useNavigation } from "@react-navigation/native";
import { APP_LOCATION_EDIT } from "../../components/Navigator/Routes";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootReducerType } from "../../store/reducers";
import { parkingsSelector } from "../../store/selectors";
import Icons from "../../components/Icons";

const Recent = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const parkingsReducer = useSelector<RootReducerType, ParkingsState>(
    parkingsSelector
  );
  const onPress = () => navigation.navigate(t(APP_LOCATION_EDIT));
  const hasParkings = () => Object.keys(parkingsReducer.parkings).length > 0;

  return (
    <BaseLayout level={"2"}>
      <List spacer>
        {hasParkings() ? (
          Object.values(parkingsReducer.parkings).map((parking) => (
            <ParkingCard parking={parking} />
          ))
        ) : (
          <Text>
            No parking saved. You can create one with the button below
          </Text>
        )}
      </List>
      <MainAction>
        <Button accessoryLeft={Icons.Add} onPress={onPress}>
          CREATE NEW
        </Button>
      </MainAction>
    </BaseLayout>
  );
};

export default Recent;
