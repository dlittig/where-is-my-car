import React, { useEffect, useCallback, FC } from "react";

import { Vibration } from "react-native";
import { useTranslation } from "react-i18next";
import { Notifier, NotifierComponents } from "react-native-notifier";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/core";

import { Parking } from "../../store/types";
import Navigation from "../../services/navigation";
import { APP_LOCATION_VIEW } from "../Navigator/Routes";
import { withStyles } from "@ui-kitten/components";
import { NotificationListenerComponentType } from "./types";

const NotificationListener: FC<NotificationListenerComponentType> = ({
  eva,
}) => {
  const { t } = useTranslation();
  const VIBRATION_PATTERN: number[] = [
    800, 200, 800, 200, 800, 800, 200, 800, 200,
  ];

  const handleNotification = useCallback(
    (notification: Notifications.Notification) => {
      const payload = notification.request.content.data as Parking;

      Notifier.showNotification({
        title: notification.request.content.title || "",
        description: notification.request.content.body || "",
        duration: 10000,
        showAnimationDuration: 800,
        Component: NotifierComponents.Notification,
        componentProps: {
          containerStyle: {
            backgroundColor: eva?.style.container.backgroundColor,
          },
          descriptionStyle: {
            color: eva?.style.container.textColor,
          },
          titleStyle: {
            color: eva?.style.container.textColor,
          },
        },
        onPress: () => {
          Navigation.navigate(t(APP_LOCATION_VIEW), { id: payload.id });
        },
        hideOnPress: false,
      });

      Vibration.vibrate(VIBRATION_PATTERN, false);
    },
    []
  );

  useEffect(() => {
    const listener =
      Notifications.addNotificationReceivedListener(handleNotification);
    return () => listener.remove();
  }, []);

  return <></>;
};

export default withStyles(NotificationListener, (theme) => ({
  container: {
    backgroundColor: theme["background-basic-color-3"],
    textColor: theme["text-basic-color"],
  },
}));
