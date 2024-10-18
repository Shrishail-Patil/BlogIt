var jwt = require("jsonwebtoken");
require('dotenv').config();

const fetchuser = (req, res, next) => {
  //get user from jwt token and add id to req body
  const token = req.header("authtoken");
  if (!token) {
    res.status(401).send({ error: "please authenticate using a proper token" });
  }
  else{
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      req.id = data.id;
      next();
    } catch (error) {
        res.status(401).send({ error: error});
        // .send({ error: "please authenticate using a proper token" });
    }
}
};

module.exports = fetchuser;
