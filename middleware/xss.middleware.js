const xss = require("xss");

exports.xssMiddleware = (req, res, next) => {
  const fields = Object.keys(req.body);
  const body = req.body;
  for (field in fields) {
    if (body[fields[field]]) body[fields[field]] = xss(body[fields[field]]);
  }
  next();
};
