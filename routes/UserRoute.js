const express = require("express");
const Router = express.Router();
const Path = require("path");
const RegisterController = require("../Controller/RegisterController");
const authController = require('../Controller/authController')
const UserController = require('../Controller/UserController') 

Router.use(express.json());
Router.use(express.urlencoded({extended: true}));

//Middleware
Router.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css/'));
Router.use('/script', express.static(__dirname + '/node_modules/bootstrap/dist/js'));


Router.route('/')
  .get(UserController.getAllUsers)

Router.route("/signup")
  .get(RegisterController.signupForm)
  .post(RegisterController.HandleNewUser);

Router.route('/login')
  .get(authController.LoginForm)
  .post(authController.handleLogin);

module.exports = Router;
