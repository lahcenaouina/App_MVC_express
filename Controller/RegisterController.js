const { render } = require("pug");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const UserModel = require("../Model/User");
const { Hash } = require("crypto");
const { error } = require("console");

const signupForm = (req, res) => {
  res.render("FormSignUp", { title: "Signup" });
};

const HandleNewUser = async (req, res) => {
  const { fullname, email, pwd, rpwd } = req.body;

  if (!fullname | !email | !pwd | !rpwd)
    return res.status(400).json({
      title: "SignUp : Missing Input field",
      MessageUrlDanger: "Please make sure to complete all the inputs.",
    });

  try {
    const emailExists = await UserModel.isEmailAddressExist(email);
    if (emailExists) {
      res.status(400).json({
        title: email + "SignUp : The email has already been registered.",
        MessageUrlDanger: "The email has already been registered.",
      });
    }
  } catch (err) {
    console.error("Error:", err);
  }
  if (pwd !== rpwd) {
    return res.status(400).json({
      title: "SignUp",
      MessageUrlDanger: "Password not matched.",
    });
  }
  //hash password
  const HashedPwd = await bcrypt.hash(pwd, 10);
  // Insert into db
  await UserModel.AddNewUser(
    fullname,
    email,
    HashedPwd,
    UserModel.TYPE.USER,
    (err, result) => {
      if (!err) {
        if (result.affectedRows === 1)
          return res.status(201).json({
            status: "Success",
            Message: "Compte was created successfully",
          });
      } else {
        // Handle the error
        console.error("Error:", err);
      }
    }
  );
};

module.exports = {
  HandleNewUser,
  signupForm,
};
