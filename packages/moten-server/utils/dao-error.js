export const daoErrorHandler = async (handler) => {
  if (typeof handler !== "function") {
    throw new Error("handler must be a function");
  }
  try {
    const result = await handler();
    return { status: true, result };
  } catch (error) {
    return { status: false, message: error };
  }
};
