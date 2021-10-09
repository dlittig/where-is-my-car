import { Parking } from "../../store/types";

export type NotificationListenerComponentType = {
  eva?: Record<string, any>;
};

export enum NOTIFICATION_KIND {
  EXPIRE = "EXPIRE",
  CREATE = "CREATE",
}

export type NotificationData = {
  type: NOTIFICATION_KIND;
  payload: Parking;
};
