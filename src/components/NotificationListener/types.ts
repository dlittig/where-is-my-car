import { Parking } from "../../store/types";

export type NotificationListenerComponentType = {};

export enum NOTIFICATION_KIND {
  EXPIRE = "EXPIRE",
  CREATE = "CREATE",
}

export type NotificationData = {
  type: NOTIFICATION_KIND;
  payload: Parking;
};
