import { Parking } from "../store/types";
import * as Location from "expo-location";
import { humanReadableTime } from "./format";
import { differenceInSeconds } from "date-fns";
import * as Notifications from "expo-notifications";
import { NOTIFICATION_KIND } from "../components/NotificationListener/types";

export const requestNotificationPermission = async (): Promise<boolean> => {
  let notificationStatus: Location.PermissionStatus;

  try {
    const { status } = await Notifications.requestPermissionsAsync();
    notificationStatus = status;
  } catch (e) {
    console.error(
      `An error occured when asking for notification permission: ${e}`
    );

    return false;
  }

  if (notificationStatus !== "granted") {
    console.warn(
      `Notification permission was not granted: ${notificationStatus}`
    );
    return false;
  }

  return true;
};

export const scheduleExpirationNotification = async (
  target: Date,
  payload: Parking
): Promise<string | undefined> => {
  let secondsDelta = differenceInSeconds(target, new Date());

  if (secondsDelta <= 0) {
    return;
  }

  // If notification is being scheduled earlier than 15 minutes, default to 1 min
  if (secondsDelta > 0 && secondsDelta < 15 * 60) {
    secondsDelta = 60;
  } else {
    secondsDelta = secondsDelta - 15 * 60;
  }

  const schedulingOptions = {
    content: {
      title: "Ticket is expiring",
      body: `Your parking expires at ${humanReadableTime(target.getTime())}!`,
      sound: true,
      priority: Notifications.AndroidNotificationPriority.MAX,
      color: "blue",
      data: {
        type: NOTIFICATION_KIND.EXPIRE,
        payload,
      },
    },
    trigger: {
      seconds: secondsDelta,
    },
  };

  return await Notifications.scheduleNotificationAsync(schedulingOptions);
};

export const scheduleCreationNotification = async (payload: Parking) => {
  const schedulingOptions = {
    content: {
      title: "Car parked",
      body: `Tap to navigate.`,
      sound: true,
      priority: Notifications.AndroidNotificationPriority.LOW,
      color: "#666",
      data: {
        type: NOTIFICATION_KIND.CREATE,
        payload,
      },
    },
    trigger: null,
  };

  return await Notifications.scheduleNotificationAsync(schedulingOptions);
};

export const cancelNotification = async (id: string) => {
  await Notifications.cancelScheduledNotificationAsync(id);
};
