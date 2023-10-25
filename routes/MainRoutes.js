const express = require('express');
const MainController = require("../Controller/MainController");
const Router = express.Router();


// Middleware to parse JSON and URL-encoded data


Router.use(express.json()); // for parsing application/json
Router.use(express.urlencoded({extended: true}));


const Mainctrl = new MainController();

Router.all('/', Mainctrl.index);

Router.get('/about', Mainctrl.about);

Router.get('/login', Mainctrl.login);

Router.get('/sendForm', Mainctrl.sendForm);

Router.post('/submit', Mainctrl.submit);


module.exports = Router;