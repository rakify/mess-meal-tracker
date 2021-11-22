const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { verifyTokenAndAuthorization } = require("./verifyToken");
const { response } = require("express");

//REGISTER
router.post("/register", async (req, res) => {
  req.body.password = CryptoJS.AES.encrypt(
    req.body.password,
    process.env.pass_secret
  ).toString();
  try {
    //creating new user
    const newUser = new User(req.body);
    //saving user and response
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json("User not found!");

    const validPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.pass_secret
    ).toString(CryptoJS.enc.Utf8);
    validPassword !== req.body.password &&
      res.status(401).json("Wrong credentials!");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.jwt_secret,
      { expiresIn: "30d" }
    );

    const { password, admin_key, ...others } = user._doc;

    res
      .status(200)
      .cookie("jwt", accessToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 2592000000), //2592000000 miliseconds = 30 days
        sameSite: "strict",
      })
      .json({ ...others });
  } catch (err) {
    res
      .status(500)
      .json("Server failed to connect. Please check your internet connection.");
  }
});

//UPDATE USER
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  console.log(req.body);
  if (req.body.key === true) {
    const randomKey = Math.floor(1000 + Math.random() * 9000);
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { admin_key: randomKey },
        {
          new: true,
        }
      );

      //Email process begins here
      let transporter = nodemailer.createTransport({
        host: "smtp.sendgrid.net",
        port: 465,
        secure: true,
        auth: {
          user: "apikey",
          pass: process.env.SENDGRID_API_KEY,
        },
      });

      let mailOption = {
        from: "irakibm@gmail.com",
        to: updatedUser.email,
        subject: `Mess Meal Tracker - New Key`,
        text: `Dear ${updatedUser.username},\nIt seems that you requested to reset your admin key.\nHere is the key.\nKey: ${randomKey}\nThank you for using mess meal tracker.\nIf you have any query regarding the site, please reply to this mail.`,
      };

      transporter.sendMail(mailOption, function (err, data) {
        if (err) {
          return res.json({
            msg: "Can not send email",
            err,
          });
        } else {
          return res.status(200).json("An email has been sent to the associated email id. Please make sure to check spam folders also.");
        }
      });
      console.log(updatedUser);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.pass_secret
      ).toString();
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      const { password, admin_key, ...others } = updatedUser._doc;
      res.status(200).json({ ...others });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
});

//LOGOUT
router.get("/logout", (req, res) => {
  res.status(200).clearCookie("jwt").json({ logout: true });
});

module.exports = router;
