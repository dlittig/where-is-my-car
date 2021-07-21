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
  [k: string]: unknown;
};

export type ParkingsState = {
  parkings: {
    [x: string]: Parking;
  };
};

export const paymentUnits: PaymentUnitType[] = ["€", "$", "CHF", "¥", "£"];
