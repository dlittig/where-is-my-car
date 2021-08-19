import React, { useEffect, useCallback, FC } from "react";
import * as Notifications from "expo-notifications";

const NotificationListener: FC = () => {
  const handleNotification = useCallback(
    (notification: Notifications.Notification) => {
      console.log(notification);
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

export default NotificationListener;
