export const DATE_TIME_INPUT_MODE = {
  time: "time",
  date: "date",
} as const;

export type DateTimeInputComponentType = {
  mode: keyof typeof DATE_TIME_INPUT_MODE;
  label: string;
  value: Date;
  onChange: (value: Date) => void;
};
