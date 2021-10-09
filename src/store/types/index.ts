export type PaymentUnitType = "$" | "€" | "CHF" | "¥" | "£";

export type Parking = {
  id: string;
  name: string;
  notes: string;
  time: number;
  reminderDateTime?: Date;
  hasReminder: boolean;
  paid: string;
  longitude: number;
  latitude: number;
  photos: string[];
  unit: PaymentUnitType;
  isActive: boolean;
  scheduledNotification?: string;
  [k: string]: unknown;
};

export type ParkingsState = {
  parkings: {
    byId: {
      [x: string]: Parking;
    };
    allIds: Array<Parking["id"]>;
  };
  sortedParkings: string[];
};

export type AppState = {
  search: string;
  currentLimit: number;
};

export const paymentUnits: PaymentUnitType[] = ["€", "$", "CHF", "¥", "£"];

export type SettingsState = {
  theme: string;
  introSeen: boolean;
  locationPermission: boolean;
  locationPermissionAskAgain: boolean;
  imagePermission: boolean;
  imagePermissionAskAgain: boolean;
  notificationPermission: boolean;
  notificationPermissionAskAgain: boolean;
};
