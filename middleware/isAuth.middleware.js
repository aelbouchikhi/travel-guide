const { tokenFunction } = require("../helpers/jwt");

exports.isAuth = (req, res, next) => {
  const tokenWithBearrer = req.headers.authorization;
  let token;
  if (tokenWithBearrer) {
    token = tokenWithBearrer.split(" ")[1];
    console.log(token);
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
};
