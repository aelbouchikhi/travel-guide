

const { generateToken, verifyToken } = require("../helpers/jwt");
const {
  hashedPassword,
  matshPassword,
} = require("../helpers/hashPassword.helpers");
const { findUseremail } = require("../helpers/findUserEmail.helpers");
const userSchema = require("../models/schema/user.schema");
const { userInfo } = require("os");

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, age, sex, country, phoneNumber } =
      req.body;
    // const imageprofile = req.file.filename;
    const passhash = await hashedPassword(password);
    const newuser = new userSchema({
      username,
      email,
      password: passhash,
      age,
      sex,
      country,
      phoneNumber,
      // image: imageprofile
    });
    const userRegisterd = await newuser.save();
    res.status(201).json(userRegisterd);
  } catch (err) {
    console.log("error in register");
    res.status(500).send(err.message);
  }
};
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const User = await findUseremail(email);
    if (!User) {
      return res.status(404).send("User not found");
    }
    const checkPassword = matshPassword(password, User.password);
    if (!checkPassword) {
      return res.status(404).send("User not found");
    }
    const token = await generateToken(
      { username: User.username, email: User.email, id: User._id },
      res
    );
    res.cookie("tokenLogin", token);
    res.status(200).json(token);
  } catch (err) {
    console.log(err);
    return res.status(401).send("Unauthorized");
  }
};

exports.resetPassword = async (req, res) => {
  const { email } = req.user;
  const User = findUseremail(email);
  const { oldPassword, newPassword } = req.body;
  if (!matshPassword(oldPassword, User.password))
    return res.send(" Your Current Password is Incorrect");
  try {
    await User.updateOne(
      { email: email },
      { [password]: hashedPassword(newPassword) }
    );
  } catch (error) {
    res.send(error.message);
  }
};

exports.verifyEmail = async (req, res) => {
  const { token } = req.params;
  const User = verifyToken(token);
  const UserDocument = findUseremail(User.email);
  if (!UserDocument) return res.send(`You Are Not The User ${User.email}`);
  userSchema.updateOne({ _id: User.id }, { isVerified: true });
  res.redirect("/login");
};