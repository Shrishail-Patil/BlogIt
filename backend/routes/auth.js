const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const  jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;


// ROUTE 1 : Create User using:POST /api/auth/signup no auth req.
router.post("/signup",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    success = true
    const result = validationResult(req);
    if (!result.isEmpty()) {
      success = false
      return res.status(400).json({success, errors: result.array() });
    }
    else{
    //checking if a user with same mail exists
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        res.status(400).json({ msg: "email already exists in db" });
      }
      else {
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: secPass,
        });
        const data = {
          id: user.id,
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        // res.json(user)
        res.json({success, authToken });
      }
    } catch (error) {
      success = false
      console.error(error.message);
      res.status(500).json({success, error: "Internal server error occured" });
    }
  }
  }
);

// ROUTE 2 : Authenticate a user using:POST /api/auth/login auth req.
router.post("/login",
    [
      body("email", "Enter a valid mail").isEmail(),
      body("password", "Enter a valid password").exists(),
    ],
    async (req, res) => {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }
      else{
      const { email, password } = req.body;
      try {
        let user = await User.findOne({ email });
        if (!user) {
          res.status(400).json({ error: "please try to login with correct credentials" });
        }
        else{
            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                success = false
                res.status(400).json({ error: "please try to login with correct credentials" });
        } else {
          const data = {
            id: user.id,
          };
          success = true
          const authToken = jwt.sign(data, JWT_SECRET);
          res.json({name:user.name,success,authToken});
        }
    }
      } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal server error occured" });
      }
    }
    }
  );
  
// ROUTE 3 : Get user details using GET /api/auth/getdetails auth req.
router.get("/getdetails",fetchuser,async(req,res)=>{
    try {
        const userDetails = await User.findById(req.id).select("-password");
        res.json(userDetails)
    } catch (error) {
        res.status(401).send(error.message)
    }

})

// ROUTE 4 : Get all users using GET /api/auth/getusers auth req.
router.get("/getusers",async(req,res) =>{
  const users = await User.find({}).select('-password');
  res.json(users)
})

// // ROUTE 5 : Get user name using GET /api/auth/getuser auth req.
// router.get('/getuser/:id', async (req,res) =>{
//   const user = await User.findById(req.params.id)
//   res.send(user.name)
// })

module.exports = router;
