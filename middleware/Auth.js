const jwt = require("jsonwebtoken");
const createError = require("http-errors");

function Authgurd(req, res, next) {
  try {
    const myCookie = req.signedCookies;
    const isValid = jwt.verify(
      myCookie[process.env.COOKIE_NAME],
      process.env.JWT_TOKEN
    );
    const { id, username, email } = isValid;
    req.id = id;
    req.username = username;
    req.email = email;
    next();
  } catch (err) {
    res.status(500).redirect("/");
  }
}

function AdminAuthGurd(req, res, next) {
  try {
    const myCookie = req.signedCookies;
    const isValid = jwt.verify(
      myCookie[process.env.ADMIN_COOKIE_NAME],
      process.env.ADMIN_TOKEN
    );
    const { id, username, email } = isValid;
    req.id = id;
    req.username = username;
    req.email = email;
    next();
  } catch (err) {
    res.status(500).redirect("/");
  }
}

module.exports = {
  Authgurd,AdminAuthGurd
};
