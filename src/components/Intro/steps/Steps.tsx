import React, { FC } from "react";

import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Avatar, Button, Text } from "react-native-paper";

import {
  showToast,
  requestLocationPermission,
  requestNotificationPermission,
} from "../../../utils";
import style from "./Steps.style";
import BaseLayout from "../../BaseLayout";
import { StepsComponentType } from "./types";
import { setSeenIntro } from "../../../store/actions";

const BaseStep: FC = ({ children }) => (
  <BaseLayout center padded>
    {children}
  </BaseLayout>
);

export const StepDescription: FC<StepsComponentType> = () => {
  const { t } = useTranslation();
  return (
    <BaseStep>
      <Text variant="headlineMedium" style={[style.headline, style.text]}>
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
      showToast(t("error.permissions"));
    } else {
      // Unlock next step
      setStepLocks(stepLocks.filter((value) => value !== currentStep));
    }
  };

  return (
    <BaseStep>
      <Text variant="headlineMedium" style={[style.text, style.headline]}>
        {t("text.intro.location.title") as string}
      </Text>

      <Text style={style.text}>
        {t("text.intro.location.description") as string}
      </Text>

      <Button
        style={style.mainAction}
        onPress={getLocationPermission}
        mode="contained-tonal"
        icon="shield-key"
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
      showToast("Something went wrong, please try again.");
    } else {
      // Unlock next step
      setStepLocks(stepLocks.filter((value) => value !== currentStep));
    }
  };

  return (
    <BaseStep>
      <Text variant="headlineMedium" style={[style.text, style.headline]}>
        {t("text.intro.notification.title") as string}
      </Text>

      <Text style={style.text}>
        {t("text.intro.notification.description") as string}
      </Text>

      <Button
        style={style.mainAction}
        onPress={getNotificationPermission}
        mode="contained-tonal"
        icon="shield-key"
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
      <Text variant="headlineMedium" style={[style.text, style.headline]}>
        {t("text.intro.media.title") as string}
      </Text>

      <Text style={style.text}>
        {t("text.intro.media.description") as string}
      </Text>

      <Button
        style={style.mainAction}
        onPress={getMediaPermission}
        mode="contained-tonal"
        icon="shield-key"
      >
        {t("actions.grantPermission") as string}
      </Button>

      <Text variant="bodyMedium" style={style.text}>
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
        <Avatar.Icon
          size={24}
          color="#DB2C66"
          icon="folder"
          style={style.icon}
        />
      </Text>
      <Text variant="headlineMedium" style={[style.text, style.headline]}>
        {t("text.intro.launch.title") as string}
      </Text>

      <Text style={style.text}>
        {t("text.intro.launch.description") as string}
      </Text>

      <Button
        style={style.mainAction}
        onPress={launch}
        mode="contained-tonal"
        icon="rocket-launch"
      >
        {t("actions.launch") as string}
      </Button>
    </BaseStep>
  );
};
