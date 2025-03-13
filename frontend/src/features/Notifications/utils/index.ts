export const successNotification = (message: string) => {
  return {
    message,
    type: "success",
    duration: 10000,
  };
};

export const errorNotification = (message: string) => {
  return {
    message,
    type: "error",
    duration: 5000,
  };
};

export const infoNotification = (message: string) => {
  return {
    message,
    type: "info",
    duration: 5000,
  };
};
