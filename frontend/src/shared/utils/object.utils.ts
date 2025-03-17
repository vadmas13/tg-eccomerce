export const isEmptyObject = (obj?: Record<string, unknown>) => {
  if (!obj) return true;

  if (!Object.keys(obj).length) {
    return true;
  }

  return Object.keys(obj).some((key) => {
    const value = obj[key];
    if (Array.isArray(value) && !!value.length) {
      return false;
    }

    return !!value;
  });
};
