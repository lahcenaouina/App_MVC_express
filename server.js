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
const SessionOptions = require("./Config/SessionOptions");
const session = require("express-session");


Db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('%cConnected to the database', 'color: green');

});


app.use(session(SessionOptions));


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

// Logs
app.use(TrafficsLogs);
app.use(LogErrors);

// Routes
const MainRoutes = require("./routes/MainRoutes");
const UserRoute = require("./routes/UserRoute");

app.use("/user", UserRoute);
app.use("/", MainRoutes);
// Handle 404 Not Found
app.all("/*", (req, res) =>
  res.status(404).send("<h1>PAGE NOT FOUND 404</h1>")
);

// Server
app.listen(PORT, () => {
  console.log("Server Running at Port : " + PORT);
});
