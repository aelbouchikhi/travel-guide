const { hashPassword, compareHashedPassword } = require("../helpers/hashPassword");
const { generateToken} = require("../helpers/jwt");
const { findUser, matchedPassword } = require("../helpers/userQuery");
const userSchema = require("../models/schema/user.schema");

//user register
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

//user login 
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
  const {userId} = req.user;
  try {
    const userProfile = await userSchema.findById(userId);

    if(!userProfile) return res.status(404).json({message: 'profile not found'});

    res.status(200).json({message:`welcome to ur profile ${userProfile.username}`, profileData: userProfile})
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//update the user profile
exports.updateUserProfile = async (req, res) => {
    const {userId} = req.user;

    if(req.file){
      const {filename} = req.file;
      req.body.image = filename
    }
    const user = await userSchema.findById(userId);
    if(Object.keys(req.body).includes('password')){
        const newPassword = req.body.password;
        const verify = await compareHashedPassword(newPassword, user.password)
        if(!verify){
          const hashedPassword = await hashPassword(newPassword)
          req.body.password = hashedPassword;
          const userUpdate = await userSchema.findByIdAndUpdate(userId, req.body, {new: true});
          res.json({message: 'profile has been updated successfilly', user: userUpdate});
        }else{
          const userUpdate = await userSchema.findByIdAndUpdate(userId, {...req.body,password: user.password}, {new: true});
          res.json({message: 'profile has been updated successfilly', user: userUpdate});
        }
      }else{
        const userUpdate = await userSchema.findByIdAndUpdate(userId, req.body, {new: true});
        res.json({message: 'profile has been updated successfilly', user: userUpdate});
      }
}

//delete the user profile
exports.deleteUserProfile = async (req, res) => {
    try{
        const {userId} = req.user;
        const userDelete = await userSchema.findByIdAndDelete(userId);
        res.json({message: `profile with id ${userId} has been deleted successfilly`});
    }catch(err){
        return res.send(500).json({ message: err.message});
    }
}

