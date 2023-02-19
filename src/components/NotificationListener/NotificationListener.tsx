import React, { useEffect, useCallback, FC } from "react";

import { Vibration } from "react-native";
import { useTranslation } from "react-i18next";
import * as Notifications from "expo-notifications";
import { Notifier, NotifierComponents } from "react-native-notifier";

import {
  NotificationData,
  NOTIFICATION_KIND,
  NotificationListenerComponentType,
} from "./types";
import { Parking } from "../../store/types";
import { routeToLocation } from "../../utils";
import Navigation from "../../services/navigation";
import { APP_LOCATION_VIEW } from "../Navigator/Routes";

const handleNotificationPress = (
  response: Notifications.NotificationResponse
) => {
  const data = response.notification.request.content.data as NotificationData;

  if (data.type === NOTIFICATION_KIND.CREATE) {
    routeToLocation(data.payload.latitude, data.payload.longitude);
  }
};

const handleNotification = async (notification: Notifications.Notification) => {
  const data = notification.request.content.data as NotificationData;

  if (data.type === NOTIFICATION_KIND.EXPIRE) {
    return {
      shouldShowAlert: false,
      shouldPlaySound: false,
      shouldSetBadge: false,
    };
  } else if (data.type === NOTIFICATION_KIND.CREATE) {
    return {
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: true,
    };
  } else {
    return {
      shouldShowAlert: false,
      shouldPlaySound: false,
      shouldSetBadge: false,
    };
  }
};

const NotificationListener: FC<NotificationListenerComponentType> = () => {
  const { t } = useTranslation();
  const VIBRATION_PATTERN: number[] = [
    800, 200, 800, 200, 800, 800, 200, 800, 200,
  ];

  const handleNotificationReceive = useCallback(
    (notification: Notifications.Notification) => {
      const data = notification.request.content.data as NotificationData;

      if (data.type === NOTIFICATION_KIND.EXPIRE) {
        const payload = notification.request.content.data as Parking;

        Notifier.showNotification({
          title: notification.request.content.title || "",
          description: notification.request.content.body || "",
          duration: 10000,
          showAnimationDuration: 800,
          Component: NotifierComponents.Notification,
          componentProps: {},
          onPress: () => {
            Navigation.navigate(t(APP_LOCATION_VIEW), { id: payload.id });
          },
          hideOnPress: false,
        });

        Vibration.vibrate(VIBRATION_PATTERN, false);
      }
    },
    []
  );

  useEffect(() => {
    const receivedListener = Notifications.addNotificationReceivedListener(
      handleNotificationReceive
    );
    Notifications.setNotificationHandler({
      handleNotification,
    });

    Notifications.addNotificationResponseReceivedListener(
      handleNotificationPress
    );
    return () => receivedListener.remove();
  }, []);

  return <></>;
};

export default NotificationListener;
