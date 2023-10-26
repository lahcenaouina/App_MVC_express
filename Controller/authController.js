require('dotenv').config()
const { render } = require("pug");
const bcrypt = require("bcrypt");
const fs = require("fs");
const fsPromises = require('fs').promises
const path = require("path");
const jwt = require("jsonwebtoken");

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
  console.log(foundUser)
  if (!foundUser) {
    return res.sendStatus(401); //Unauthorized
  }
  // evaluate password
  const match = await bcrypt.compare(pwd, foundUser.hashed_pwd);
  if (match) {
    // create JWT
    const accessToken = jwt.sign(
      { username: foundUser.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );


    res.json({ success: `User ${email} is logged in!` , accessToken  });
  } else {
    res.sendStatus(401);
  }
};

module.exports = {
  handleLogin,
  LoginForm,
};
