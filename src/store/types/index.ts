import ParkingCard from "../../components/ParkingCard";

export type PaymentUnitType = "$" | "€" | "CHF" | "¥" | "£";

export type Parking = {
  id: string;
  name: string;
  time: number;
  reminderTime?: number;
  reminderDate?: number;
  hasReminder: boolean;
  car: string;
  paid: string;
  longitude: number;
  latitude: number;
  locationName: string;
  photos: string[];
  unit: PaymentUnitType;
  isActive: boolean;
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
