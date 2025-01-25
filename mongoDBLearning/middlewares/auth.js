const jwt = require("jsonwebtoken");

const JWT_SECRET = "randomjlajdfoaejlsfa";

function auth(req, res, next) {
  const token = req.headers.token;

  const currentUser = jwt.verify(token, JWT_SECRET);

  if (currentUser) {
    req.id = currentUser.id;
    next();
  } else {
    res.status(403).send({
      message: "You are not allowed",
    });
  }
}

module.exports = {
  JWT_SECRET,
  auth,
  jwt,
};
