const { tokenFunction } = require("../helpers/jwt");
const {
  hashedPassword,
  matshPassword,
  bcryptFunction,
} = require("../helpers/bcrypt.helpers");
const { findUseremail, findAndUpdate } = require("../helpers/findUserEmail.helpers");
const userSchema = require("../models/schema/user.schema");
const { SERVER_DATA_CREATED_HTTP_CODE, SERVER_BAD_REQUEST_HTTP_CODE, SERVER_OK_HTTP_CODE, SERVER_NOT_FOUND_HTTP_CODE, SERVER_UNAUTHORIZED_HTTP_CODE, NO_USER_FOUND, INVALID_CURRENT_PASSWORD } = require("../config/constants.config");

//user register
exports.userRegister = async (req, res) => {
  try {
    const { firstname, lastname, username, email, password, age, sex, country, phoneNumber } = req.body;
    const { filename } = req.file;
    const newuser = new userSchema({
      firstname,
      lastname,
      username: !username ? firstname + lastname : username,
      email,
      password: await bcryptFunction.hashing(password),
      age,
      sex,
      country,
      phoneNumber,
      image: filename
    });
    const userRegistered = await newuser.save();
    res.status(SERVER_DATA_CREATED_HTTP_CODE).json(userRegistered);
  } catch (err) {
    res.status(SERVER_BAD_REQUEST_HTTP_CODE).send(err.message);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const User = await findUseremail(email);
    if (!User) return res.status(SERVER_NOT_FOUND_HTTP_CODE).send("User not found");
    const checkPassword = await bcryptFunction.compareHashingPass(password, User.password);
    if (!checkPassword) return res.status(SERVER_NOT_FOUND_HTTP_CODE).send("Your email or password incorrect");
    const token = await tokenFunction.generateToken({ username: User.username, email: User.email, id: User._id });
    res.cookie("tokenLogin", token);
    res.status(SERVER_OK_HTTP_CODE).json({ message: "user logged in succes", token: token });
  } catch (err) {
    return res.status(SERVER_UNAUTHORIZED_HTTP_CODE).json({ messageError: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  const { email } = req.user;
  const User = findUseremail(email);
  const { oldPassword, newPassword } = req.body;
  if (!matshPassword(oldPassword, User.password))
    return res.send(INVALID_CURRENT_PASSWORD);
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
  const User = await tokenFunction.verifyToken(token);
  const UserDocument = await findUseremail(User.email);
  if (!UserDocument) return res.send(`You Are Not The User ${User.email}`);
  if (UserDocument.isVerified) return res.send(`your account verified`);
  await findAndUpdate({ email: User.email }, { isVerified: true });
  return res.status(200).json(token);
};

exports.getUserProfile = async (req, res) => {
  const { id } = req.user;
  try {
    const userProfile = await userSchema.findById(id)
    if (userProfile) {
      return res.json(userProfile);
    } else {
      return res.status(404).json({ message: NO_USER_FOUND })
    };
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Erreur de serveur' })
  }
}

exports.updateUserProfile = async (req, res) => {
  const { id } = req.user;
  if (req.file) {
    const { filename } = req.file;
    req.body.image = filename
  }
  const user = await userSchema.findById(id);
  if (!user) return res.status(SERVER_BAD_REQUEST_HTTP_CODE).json({ user: "user not found" });
  const userUpdate = await userSchema.findByIdAndUpdate(id, req.body, { new: true });
  res.status(SERVER_OK_HTTP_CODE).json({ message: 'profile has been updated successfilly', user: userUpdate });
}

exports.deleteUserProfile = async () => {
  const { id } = req.user;
  try {
    const deleteProfile = await userSchema.deleteOne({ _id: id })
    if (deleteProfile.deletedCount > 0) {
      return res.status(200).json({ message: 'Profil supprimé avec succès' });
    } else {
      return res.status(404).json({ message: 'Profil introuvable' });
    }
  } catch (err) {
    console.log(err)
    return res.send(500).json({ message: 'Erreur de serveur' });
  }
}
