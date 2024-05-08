const { tokenFunction } = require("../helpers/jwt");

exports.isAuth = {
  user(req, res, next) {
    const tokenWithBearrer = req.headers.authorization;
    let token;
    if (tokenWithBearrer) {
      token = tokenWithBearrer.split(" ")[1];
    }
    if (!token)
      return res.json({
        error: "unauthorized access",
        message: "you must login first",
      });
    const verify = tokenFunction.verifyToken(token);
    if (!verify)
      return res.json({
        error: "unauthorized access",
        message: "you must login first",
      });
    req.user = verify;
    next();
  },
  admin(req, res, next) {
    const tokenWithBearrer = req.headers.authorization;
    let token;
    if (tokenWithBearrer) {
      token = tokenWithBearrer.split(" ")[1];
    }
    if (!token)
      return res.json({
        error: "unauthorized access",
        message: "you must login first",
      });
    const verify = tokenFunction.verifyToken(token);
    if (!verify || verify.role !== "admin")
      return res.json({
        error: "unauthorized access",
        message: "you must login first",
      });
    req.user = verify;
    next();
  },
};
