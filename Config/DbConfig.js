require('dotenv').config()
const mysql = require('mysql2');

const Db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PWD | "",
  database: process.env.DATABASE,
});

module.exports = Db;
