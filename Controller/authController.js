require("dotenv").config();
const { render } = require("pug");
const bcrypt = require("bcrypt");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const jwt = require("jsonwebtoken");
const UserModel = require('../Model/User')

//Simulation for data
filePath = path.join(__dirname, "..", "Model", "User.json");
const UserDb = {
  Users: require("../Model/User.json"),
  setUsers: function (state) {
    return (this.Users = state);
  },
};

const LoginForm = (req, res) => {
  res.render("FormLogin", { title: "Login" });
};

const handleLogin = async (req, res) => {
  const { email, pwd } = req.body;
  console.log(email, pwd);
  if (!email || !pwd)
    return res.status(400).render("FormLogin", {
      MessageUrlDanger: "Username and password are required.",
    });
  const foundUser = UserDb.Users.find((person) => person.email === email);
  console.log(foundUser);
  if (!foundUser) {
    return res.sendStatus(401); //Unauthorized
  }
  // evaluate password
  const match = await bcrypt.compare(pwd, foundUser.hashed_pwd);
  if (match) {
    // create JWT
    const accessToken = jwt.sign(
      { email: foundUser.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1m" }
    );
    const refreshToken = jwt.sign(
      { email: foundUser.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    const OtherUsers = UserDb.Users.filter(
      (user) => user.email != foundUser.email
    );
    const currentUser = { ...foundUser, refreshToken };
    UserDb.setUsers([...OtherUsers, currentUser]);

   

    await fsPromises.writeFile(
      path.join(__dirname, "..", "Model", "User.json"),
      JSON.stringify(UserDb.Users)
    );



    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      accessToken,
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = {
  handleLogin,
  LoginForm,
};
