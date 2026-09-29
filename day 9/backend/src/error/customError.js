function customError(statusCode, status, message) {
  return res.status(status).json({
    status: status,
    message: message,
  });
}
export default customError;
