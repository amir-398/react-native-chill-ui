export const customConsole = {
  error: (message: string) => {
    if (__DEV__) {
      console.error(message);
    }
  },
};
