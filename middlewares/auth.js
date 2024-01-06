const jwt = require("jsonwebtoken");

exports.authUser = async (req, res, next) => {
  try {
    let tmp = req.header("Authorization");

    const token = tmp ? tmp.slice(7, tmp.length) : "";

    if (!token) {
      res.status(401).json({ message: "Invalid Authentification" });
    }

    jwt.verify(token, process.env.ACCES_TOKEN_SECRET, async (err, user) => {
      if (err) {
        res.status(401).json({ message: "Invalid Authentification" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
