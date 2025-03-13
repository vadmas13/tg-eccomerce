"use client";

import { useState, useEffect, SetStateAction, Dispatch } from "react";

export const useDebounce = <T>(
  value: T,
  delay: number,
  callback?: (value: T) => void,
): [T, Dispatch<SetStateAction<T>>] => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      callback?.(debouncedValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [debouncedValue]);

  return [debouncedValue, setDebouncedValue];
};
