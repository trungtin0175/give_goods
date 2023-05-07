const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const { ChangeToSlug } = require("../../util/ConvertSlug");

let refreshTokens = [];

const SiteController = {
  // [GET] /homepage
  index: async (req, res) => {
    res.status(200).json({
      message: "Welcome Homepage!",
    });
  },

  // [GET] /signup
  getSignup: async (req, res) => {
    res.status(200).json({
      message: "Welcome SignUpPage!",
    });
  },

  // [POST] /signup
  postSignup: async (req, res) => {
    try {
      const existedUser = await User.findOne({
        $or: [{ username: req.body.username }, { email: req.body.email }],
      });
      if (existedUser) {
        return res.status(400).json({
          status: false,
          message: "user existed",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      // Create the new user account
      const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        numberPhone: req.body.phonenumber,
        password: hashed,
        password: hashed,
        slug: ChangeToSlug(
          req.body.username + req.body.numberPhone + req.body.email
        ),
      });

      //Save the new user
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //JWT token
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        userID: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "365d" }
    );
  },

  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        userID: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "365d" }
    );
  },

  // [GET] /login
  getLogin: async (req, res) => {
    res.status(200).json({
      message: "Welcome LoginPage!",
    });
  },

  // [POST] /login
  postLogin: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.status(404).json({ message: "Wrong password!" });
      }
      if (user && validPassword) {
        //Generate access token
        const accessToken = SiteController.generateAccessToken(user);
        //Generate refresh token
        const refreshToken = SiteController.generateRefreshToken(user);
        //STORE REFRESH TOKEN IN COOKIE
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        const { password, ...others } = user._doc;
        res.status(200).json({ user: others, accessToken, refreshToken });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  // // [GET] /refresh
  requestRefreshToken: async (req, res, next) => {
    //Take refresh token from user
    const refreshToken = req.cookies.refreshToken;
    //Send error if token is not valid
    if (!refreshToken) return res.status(401).json("You're not authenticated");
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("Refresh token is not valid");
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        console.log(err);
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      //create new access token, refresh token and send to user
      const newAccessToken = authController.generateAccessToken(user);
      const newRefreshToken = authController.generateRefreshToken(user);
      refreshTokens.push(newRefreshToken);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    });
  },

  // [GET] /logout
  logOut: async (req, res, next) => {
    //Clear cookies when user logs out
    refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
    res.clearCookie("refreshToken");
    res.status(200).json("Logged out successfully!");
  },
};

module.exports = SiteController;
