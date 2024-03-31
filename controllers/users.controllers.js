const { hashPassword } = require("../helpers/hashPassword");
const { generateToken} = require("../helpers/jwt");
const { findUser, matchedPassword } = require("../helpers/userQuery");
const userSchema = require("../models/schema/user.schema");


exports.userRegister = async (req, res) => {
  try {
    const { username, email, password, age, sex, country, phoneNumber } =
      req.body;
    const imageprofile = req.file.filename;
    const passhash = await hashPassword(password);
    const newuser = new userSchema({
      username,
      email,
      password: passhash,
      age,
      sex,
      country,
      phoneNumber,
      image: imageprofile
    });
    const userRegisterd = await newuser.save();
    res.status(201).json({message: "user registred successfuly"});
  } catch (err) {
    res.status(500).send(err.message);
  }
};


exports.userLogin = async (req, res) => {
    try{
      const {email, password} = req.body;
      //check if the email and password fields are not empty
      if(!email || !password) return res.json({message: 'email or password fields must be provided'});
    
      //check is the user exist in db
      const user =  await findUser(email);
      if(!user) return res.json({message: "user not found"});
      
      //check if the password is correct
      const checkPassword = await matchedPassword(password, user.password);
      if(!checkPassword) return res.json({message: "password not correct"});
  
      //generate a token for the user
      const userToken = await generateToken(user._id);
      
    
      res.json({message: "user loged in successfully",token: userToken});
    }catch(err){
      res.json({error: err.message})
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

exports.getUserProfile = async (req, res) => {
  const { id } = req.user;
  try {
    const userProfile = await userSchema.findById(id);
    if (userProfile) {
      return res.json(userProfile);
    } else {
      return res.status(404).json({ message: "Profil introuvable" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur de serveur" });
  }
};
exports.updateUserProfile = async (req, res) => {
  const id = req.user.id;
  try {
    const updateProile = await userSchema.updateOne(
      { _id: id },
      { username, email, password, age, sex, country, phoneNumber },
      { new: true }
    );
    if (updateProile) {
      return res.status(200).json(updateProfile);
    } else {
      return res.status(404).json({ message: "Profil introuvable" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Erreur de serveur" });
  }
};
exports.deleteUserProfile = async () => {
  const id = req.user.id;
  try {
    const deleteProfile = await userSchema.deleteOne({ _id: id });
    if (deleteProfile.deletedCount > 0) {
      return res.status(200).json({ message: "Profil supprimé avec succès" });
    } else {
      return res.status(404).json({ message: "Profil introuvable" });
    }
  } catch (err) {
    console.log(err);
    return res.send(500).json({ message: "Erreur de serveur" });
  }
};
