const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  console.warn('❌ 404 Not Found:', req.originalUrl);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  console.error('❌ Error handler caught:', err.message);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥷' : err.stack,
  });
};

export { notFound, errorHandler };
