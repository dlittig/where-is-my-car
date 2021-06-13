export enum CARD_TYPE {
  PRIMARY = "primary",
  SUCCESS = "success",
  INFO = "info",
  WARNING = "warning",
  DANGER = "danger",
  BASIC = "basic",
}

export type BaseCardComponentType = {
  type: CARD_TYPE;
};
