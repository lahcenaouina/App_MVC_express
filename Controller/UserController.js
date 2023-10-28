const UserModel = require("../Model/User");

const getAllUsers = (req, res) => {
      UserModel.GetUsers((err , users) => {
        if (err) {
                res.status(500).json({Error : 'Error Fetching data'})
        }else {
                res.status(200).json({users})
        }
      })   
};

module.exports = {getAllUsers};
