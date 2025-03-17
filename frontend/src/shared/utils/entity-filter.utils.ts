export const getEntityFilterCount = (filters?: Record<string, unknown>) => {
  if (!filters) return;
  return Object.keys(filters).reduce((res, key) => {
    const value = filters[key];
    if (key !== "name") {
      if (Array.isArray(value)) {
        if (!!value.length) {
          res += 1;
        }
      } else if (!!value) {
        res += 1;
      }
    }

    return res;
  }, 0);
};
