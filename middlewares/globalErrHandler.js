export const globalErrHandler = (err, req, res, next) => {
  //statusCode
  //stack
  //message
  const statusCode = err?.statusCode ? err?.statusCode : 500;
  const stack = err?.stack;
  const message = err.message;
  res.status(statusCode).json({ message, stack });
};

//404 handler
export const notFound = (req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} not found`);
  next(err);
};
