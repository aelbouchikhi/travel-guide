const { tokenFunction } = require("../helpers/jwt");
const {
  hashedPassword,
  matshPassword,
  bcryptFunction,
} = require("../helpers/bcrypt.helpers");
const { findUseremail, findAndUpdate } = require("../helpers/findUserEmail.helpers");
const userSchema = require("../models/schema/user.schema");
const { SERVER_DATA_CREATED_HTTP_CODE } = require("../config/constants.config");
const { mailJs } = require("../helpers/emailjs.helpers");

//user register
exports.userRegister = async (req, res) => {
  try {
    const { firstname, lastname, username, email, password, age, sex, country, phoneNumber } = req.body;
    // const { filename } = req.file;
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
      // image: filename
    });
    const userRegistered = await newuser.save();
    await mailJs.sendMail(username, email);
    res.status(SERVER_DATA_CREATED_HTTP_CODE).json(userRegistered);
  } catch (err) {
    // console.log("error in register");
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
    const checkPassword = bcryptFunction.compareHashingPass(password, User.password);
    if (!checkPassword) {
      return res.status(404).send("User not found");
    }
    const token = await tokenFunction.generateToken(
      { username: User.username, email: User.email, id: User._id },
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
  const User = tokenFunction.verifyToken(token);
  // console.log(User.email);
  const UserDocument = findUseremail(User.email);
  if (!UserDocument) return res.send(`You Are Not The User ${User.email}`);
  findAndUpdate({ email: User.email }, { isVerified: true });
  return res.status(200).json(token);
  // res.redirect("/login");
};

exports.getUserProfile = async (req, res) => {
  const { id } = req.user;
  try {
    const userProfile = await userSchema.findById(id)
    if (userProfile) {
      return res.json(userProfile);
    } else {
      return res.status(404).json({ message: 'Profil introuvable' })
    };
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Erreur de serveur' })
  }
}

exports.updateUserProfile = async (req, res) => {
  const id = req.user.id
  try {
    const updateProile = await userSchema.updateOne({ _id: id }, { username, email, password, age, sex, country, phoneNumber }, { new: true })
    if (updateProile) {
      return res.status(200).json(updateProfile);
    } else {
      return res.status(404).json({ message: 'Profil introuvable' });
    }

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Erreur de serveur' });
  }
}
exports.deleteUserProfile = async () => {
  const id = req.user.id;
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