import { PaymentUnitType } from "../../store/types";

export type UnitInputComponentType = {
  value: PaymentUnitType;
  onChange: (value: PaymentUnitType) => void;
};
