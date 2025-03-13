/** Проверяет, что значение не равно null или undefined */
export const isDefined = <T>(val: T | undefined | null): val is T => val != undefined;

export const isNotDefined = <T>(val: T | undefined | null): val is undefined => val == undefined;
