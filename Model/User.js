const Db = require("../Config/DbConfig");

const GetUsers = (callback) => {
  Db.query("SELECT * FROM user", (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

const AddNewUser = (fullname, email, pwd) => {
  const sql ="INSERT INTO user (`username`, `email`, `password`) VALUES (?, ?, ?)";

  // Parameters to replace the placeholders
  const params = [fullname, email, pwd];

  Db.query(sql, params, (error, results) => {
    if (error) {
      console.log(error);
    } else {
      console.log("User added successfully!");
    }
  });
};

module.exports = { GetUsers, AddNewUser };
