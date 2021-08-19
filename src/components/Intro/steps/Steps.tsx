import React, { FC } from "react";

import { useDispatch } from "react-redux";
import { Button, Text } from "@ui-kitten/components";

import Icons from "../../Icons";
import style from "./Steps.style";
import BaseLayout from "../../BaseLayout";
import { StepsComponentType } from "./types";
import { setSeenIntro } from "../../../store/actions";
import {
  requestLocationPermission,
  requestNotificationPermission,
} from "../../../utils";
import { ToastAndroid } from "react-native";

const BaseStep: FC = ({ children }) => (
  <BaseLayout level="1" center padded>
    {children}
  </BaseLayout>
);

export const StepDescription: FC<StepsComponentType> = () => (
  <BaseStep>
    <Text category="h5" style={[style.headline, style.text]}>
      Welcome to "Yo where is my car?"
    </Text>

    <Text style={style.text}>
      With this app you can keep track of where you parked your car, remind
      yourself that a parking ticket is expiring soon and navigate to the
      parking location.
    </Text>
  </BaseStep>
);

export const StepLocation: FC<StepsComponentType> = ({
  setStepLocks,
  stepLocks,
  currentStep,
}) => {
  const getLocationPermission = async () => {
    const hasPermission = await requestLocationPermission();

    if (!hasPermission) {
      ToastAndroid.showWithGravityAndOffset(
        "Something went wrong, please try again.",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        100
      );
    } else {
      // Unlock next step
      setStepLocks(stepLocks.filter((value) => value !== currentStep));
    }
  };

  return (
    <BaseStep>
      <Text category="h5" style={[style.text, style.headline]}>
        Location permission
      </Text>

      <Text style={style.text}>
        We need location permission only to acquire your location, when you park
        your car. It is not used for anything else.
      </Text>

      <Button
        style={style.mainAction}
        onPress={getLocationPermission}
        appearance="filled"
        accessoryLeft={Icons.Grant}
      >
        Grant permission
      </Button>
    </BaseStep>
  );
};

export const StepNotification: FC<StepsComponentType> = ({
  setStepLocks,
  stepLocks,
  currentStep,
}) => {
  const getNotificationPermission = async () => {
    const hasPermission = await requestNotificationPermission();

    if (!hasPermission) {
      ToastAndroid.showWithGravityAndOffset(
        "Something went wrong, please try again.",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        100
      );
    } else {
      // Unlock next step
      setStepLocks(stepLocks.filter((value) => value !== currentStep));
    }
  };

  return (
    <BaseStep>
      <Text category="h5" style={[style.text, style.headline]}>
        Notification permission
      </Text>

      <Text style={style.text}>
        We need notification permission to remind you of your expiring parking time.
      </Text>

      <Button
        style={style.mainAction}
        onPress={getNotificationPermission}
        appearance="filled"
        accessoryLeft={Icons.Grant}
      >
        Grant permission
      </Button>
    </BaseStep>
  );
};

export const StepMediaLibrary: FC<StepsComponentType> = () => {
  const getMediaPermission = () => {};

  return (
    <BaseStep>
      <Text category="h5" style={[style.text, style.headline]}>
        Media permission
      </Text>

      <Text style={style.text}>
        We need the media permission, so that you can easily add photos to you
        parking.
      </Text>

      <Button
        style={style.mainAction}
        onPress={getMediaPermission}
        appearance="filled"
        accessoryLeft={Icons.Grant}
      >
        Grant permission
      </Button>

      <Text appearance="hint" style={style.text}>
        You can grant the permission later in the settings, too.
      </Text>
    </BaseStep>
  );
};

export const StepLaunch: FC<StepsComponentType> = () => {
  const dispatch = useDispatch();
  const launch = () => {
    dispatch(setSeenIntro(true));
  };

  return (
    <BaseStep>
      <Text>
        <Icons.Heart fill="#DB2C66" style={style.icon} />
      </Text>
      <Text category="h5" style={[style.text, style.headline]}>
        Awesome!
      </Text>

      <Text style={style.text}>
        You can now start using the app and save your parkings!
      </Text>

      <Button
        style={style.mainAction}
        onPress={launch}
        appearance="filled"
        accessoryLeft={Icons.Launch}
      >
        Launch!
      </Button>
    </BaseStep>
  );
};
