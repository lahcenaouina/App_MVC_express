const env = require("dotenv").config();
const PORT = process.env.PORT || 3030;
const express = require("express");
const app = express();
const Db = require("./Config/DbConfig");
const path = require("path");
const cors = require("cors");
//Middleware
const { TrafficsLogs } = require("./Middleware/Logevent");
const LogErrors = require("./Middleware/LogErros");
const VerifyJwt = require("./Middleware/VerifyJwt");
const CoreOptions = require("./Config/CoreOptions");
const SessionOptions = require('./Config/SessionOptions')
const session = require("express-session");


app.use(session(SessionOptions));

//Db Connection
Db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to the database");
});

// Cross-Origin Resource Sharing
app.use(cors());

// Configure Pug
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Middleware for static files
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use(
  "/script",
  express.static(__dirname + "/node_modules/bootstrap/dist/js")
);

// Routes
const MainRoutes = require("./routes/MainRoutes");
const UserRoute = require("./routes/UserRoute");


app.use("/user", UserRoute);
// summation understating basics of sessions in express
// app.get('/hello' , VerifyJwt , (req ,res ) => {
//     res.json('Helloworld')
// })

// app.get('/login', (req, res) => {
//     req.session.username = 'john_doe';
//     res.send('Logged in');
//   });

//   app.get('/logout', (req, res) => {
//     req.session.destroy((err) => {
//       if (err) {
//         console.error(err);
//       }
//       res.redirect('/profile');
//     });
//   });

// app.get('/profile', (req, res) => {
//     const username = req.session.username;
//     if (username) {
//         console.log(req.session)
//       res.send(`Username: ${username}`);
//     } else {
//       res.send('Not logged in');
//     }
//   });

app.use("/", MainRoutes);

// Handle 404 Not Found
app.all("/*", (req, res) =>
  res.status(404).send("<h1>PAGE NOT FOUND 404</h1>")
);

// Logs

app.use(TrafficsLogs);
app.use(LogErrors);

// Server
app.listen(PORT, () => {
  console.log("Server Running at Port : " + PORT);
});
