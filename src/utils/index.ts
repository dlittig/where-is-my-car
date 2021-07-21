export const humanReadableDate = (time: number): string => {
  const date: Date = new Date(time);
  return `${padd(date.getHours())}:${padd(date.getMinutes())} ${padd(
    date.getDate()
  )}.${padd(date.getMonth() + 1)}.${date.getFullYear()}`;
};

export const humanReadableTime = (time: number): string => {
  const date: Date = new Date(time);
  return `${padd(date.getHours())}:${padd(date.getMinutes())}`;
};

export const humanReadableMoney = (value: number, unit: string): string => {
  // Convert value to string and figure out present decimal places
  const valueString = `${value}`;
  const decimalIndex = valueString.indexOf(".");

  if (decimalIndex !== -1) {
    // Has decimal
    const padCount = valueString.length - 1 - decimalIndex;

    if (padCount === 1) {
      return `${unit} ${valueString}0`;
    } else {
      return `${unit} ${valueString}`;
    }
  } else {
    // Has no decimal
    return `${unit} ${valueString}.00`;
  }
};

export const padd = (elem: number): string =>
  elem < 10 ? `0${elem}` : `${elem}`;

export const take = <T extends unknown>(
  suspect: Record<string, any>,
  key: string,
  fallback: T
): T =>
  typeof suspect !== "undefined" &&
  suspect !== null &&
  typeof suspect[key] !== "undefined"
    ? (suspect[key] as T)
    : fallback;

export const getHoursFromTimestamp = (date: Date) => new Date(date).getHours();

export const getMinutesFromTimestamp = (date: Date) =>
  new Date(date).getMinutes();
