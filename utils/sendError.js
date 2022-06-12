export const sendError = (res, error, status = 400) => {
  return res.status(status).json({ success: false, message: error });
};
