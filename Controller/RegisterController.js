const { render } = require("pug");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

//Simulation for data
filePath = path.join(__dirname, "..", "Model", "User.json");
const UserDb = {
  Users: require("../Model/User.json"),
  setUsers: function (state) {
    return (this.Users = state);
  },
};

const signupForm = (req, res) => {
  res.render("FormSignUp", { title: "Signup" });
};



const HandleNewUser = async (req, res) => {
  const { fullname, email, pwd, rpwd } = req.body;
  
  if (!fullname | !email | !pwd | !rpwd)
    return res.status(400).render("FormSignUp", {
      title: "SignUp : Missing Input field",
      MessageUrlDanger: "Please make sure to complete all the inputs.",
    });
  //check email :
  if (UserDb.Users.find((user) => user.email == email)) {
    res.status(400).render("FormSignUp", {
      title: "SignUp : The email has already been registered.",
      MessageUrlDanger: "The email has already been registered.",
    });
  }
  if (pwd !== rpwd) {
        return res.status(400).render("FormSignUp", {
          title: "SignUp",
          MessageUrlDanger: "Password not matched.",
        });
      }
  //hash password
  const HashedPwd = await bcrypt.hash(pwd, 10);
  //Insert into db
  try {
    UserDb.setUsers([
      ...UserDb.Users,
      {
        id: UserDb.Users.length + 1,
        fullname: fullname,
        email: email,
        hashed_pwd: HashedPwd,
      },
    ]);

    fs.writeFile(filePath, JSON.stringify(UserDb.Users), "utf8", (err) => {
      if (err) {
        console.error("Error writing to file:", err);
      } else {
        console.log("Data has been written to the file.");
      }
    });
  } catch (e) {
    res.status(500).send(e.message);
  } finally {
    res.status(200).json(UserDb.Users)
  }
};

module.exports = {
  HandleNewUser,
  signupForm
};
