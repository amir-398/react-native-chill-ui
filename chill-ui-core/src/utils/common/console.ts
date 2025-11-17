export const customConsole = {
  error: (message: string) => {
    if (__DEV__) {
      console.error(message);
    }
  },
  warn: (message: string) => {
    if (__DEV__) {
      console.warn(message);
    }
  },
};
