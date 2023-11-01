const Db = require("../Config/DbConfig");
const TYPE = {
  USER: "USER",
  ADMIN: "ADMIN",
};
const GetUsers = (callback) => {
  Db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};



const AddNewUser = (username, email, hashedPassword, userType, callback) => {
  const sql = "INSERT INTO `users` (`Username`, `Email`, `Hashed_pwd`, `type`) VALUES (?, ?, ?, ?)";
  const values = [username, email, hashedPassword, userType];

  Db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting user: ' + err);
      callback(err, null);
    } else {
      console.log('User inserted successfully');
      callback(null, result);
    }
  });
}

function isEmailAddressExist(email) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT Email FROM `users` WHERE Email = ?";

    Db.query(sql, [email], (err, results) => {
      if (err) {
        console.error('Error checking email existence: ' + err);
        reject(err);
      } else {
        console.log('Checked email existence successfully');
        resolve(results.length > 0);
      }
    });
  });
}


module.exports = { GetUsers, AddNewUser, isEmailAddressExist ,TYPE };
