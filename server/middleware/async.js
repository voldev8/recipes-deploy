//https://www.acuriousanimal.com/blog/2018/03/15/express-async-middleware

// simplifies error handling without having to wrap it in try-catch
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;
