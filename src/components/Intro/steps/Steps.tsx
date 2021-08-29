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
import { useTranslation } from "react-i18next";

const BaseStep: FC = ({ children }) => (
  <BaseLayout level="1" center padded>
    {children}
  </BaseLayout>
);

export const StepDescription: FC<StepsComponentType> = () => {
  const { t } = useTranslation();
  return (
    <BaseStep>
      <Text category="h5" style={[style.headline, style.text]}>
        {t("text.intro.description.title") as string}
      </Text>

      <Text style={style.text}>
        {t("text.intro.description.description") as string}
      </Text>
    </BaseStep>
  );
};

export const StepLocation: FC<StepsComponentType> = ({
  setStepLocks,
  stepLocks,
  currentStep,
}) => {
  const { t } = useTranslation();
  const getLocationPermission = async () => {
    const hasPermission = await requestLocationPermission();

    if (!hasPermission) {
      ToastAndroid.showWithGravityAndOffset(
        t("error.permissions"),
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
        {t("text.intro.location.title") as string}
      </Text>

      <Text style={style.text}>
        {t("text.intro.location.description") as string}
      </Text>

      <Button
        style={style.mainAction}
        onPress={getLocationPermission}
        appearance="filled"
        accessoryLeft={Icons.Grant}
      >
        {t("actions.grantPermission") as string}
      </Button>
    </BaseStep>
  );
};

export const StepNotification: FC<StepsComponentType> = ({
  setStepLocks,
  stepLocks,
  currentStep,
}) => {
  const { t } = useTranslation();
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
        {t("text.intro.notification.title") as string}
      </Text>

      <Text style={style.text}>
        {t("text.intro.notification.description") as string}
      </Text>

      <Button
        style={style.mainAction}
        onPress={getNotificationPermission}
        appearance="filled"
        accessoryLeft={Icons.Grant}
      >
        {t("actions.grantPermission") as string}
      </Button>
    </BaseStep>
  );
};

export const StepMediaLibrary: FC<StepsComponentType> = () => {
  const { t } = useTranslation();
  // TODO Request permission here
  const getMediaPermission = () => {};

  return (
    <BaseStep>
      <Text category="h5" style={[style.text, style.headline]}>
        {t("text.intro.media.title") as string}
      </Text>

      <Text style={style.text}>
        {t("text.intro.media.description") as string}
      </Text>

      <Button
        style={style.mainAction}
        onPress={getMediaPermission}
        appearance="filled"
        accessoryLeft={Icons.Grant}
      >
        {t("actions.grantPermission") as string}
      </Button>

      <Text appearance="hint" style={style.text}>
        {/* TODO Provide permission controls in the settings. */}
        {t("text.intro.media.hint") as string}
      </Text>
    </BaseStep>
  );
};

export const StepLaunch: FC<StepsComponentType> = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const launch = () => {
    dispatch(setSeenIntro(true));
  };

  return (
    <BaseStep>
      <Text>
        <Icons.Heart fill="#DB2C66" style={style.icon} />
      </Text>
      <Text category="h5" style={[style.text, style.headline]}>
        {t("text.intro.launch.title") as string}
      </Text>

      <Text style={style.text}>
        {t("text.intro.launch.description") as string}
      </Text>

      <Button
        style={style.mainAction}
        onPress={launch}
        appearance="filled"
        accessoryLeft={Icons.Launch}
      >
        {t("actions.launch") as string}
      </Button>
    </BaseStep>
  );
};
