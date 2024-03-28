

const {generateToken} = require('../helpers/jwt')
const {hashedPassword, matshPassword} = require('../helpers/hashPassword.helpers');
const { findUseremail} = require('../helpers/findUserEmail.helpers');
const userSchema = require('../models/schema/user.schema')
const jwt = require('jsonwebtoken')

exports.registerUser = async(req,res)=>{
    try{
        const{username, email, password,age,sex,country,phoneNumber} = req.body;
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
        })
        const userRegisterd = await newuser.save()
        res.status(201).json(userRegisterd)
        }catch(err){
            console.log("error in register");
            res.status(500).send(err.message)
        }
}
exports.loginUser = async(req,res)=>{
    try{
        const {email, password} = req.body;
        const User = await findUseremail(email);
        if(!User){
            return res.status(404).send("User not found")
        }
        const checkPassword = matshPassword(password, User.password)
        if(!checkPassword){
            return res.status(404).send("User not found")
        }
        const token = await generateToken({username:User.username, email:User.email, id:User._id},res)
        res.cookie ('tokenLogin', token);
        res.status(200).json(token);
    }catch(err){
        console.log(err)
        return res.status(401).send("Unauthorized");
    }
}
exports.getUserProfile = async (req,res)=>{
    const {id} = req.user;
    try{
        const userProfile = await userSchema.findById(id)
        if(userProfile){
            return res.json(userProfile);
        }else{
            return res.status(404).json({message:'Profil introuvable'})
        };
    }catch(err){
        console.log(err)
        res.status(500).json({message: 'Erreur de serveur'})
    }
}
exports.updateUserProfile = async(req,res)=>{
    const id = req.user.id
    try{
        const updateProile = await userSchema.updateOne({_id: id}, {username, email, password,age,sex,country,phoneNumber}, {new: true})
        if(updateProile){
            return res.status(200).json(updateProfile);
        }else{
            return res.status(404).json({ message: 'Profil introuvable' });
        }
        
    }catch(err){
        console.log(err);
        return res.status(500).json({ message: 'Erreur de serveur' });
    }
}
exports.deleteUserProfile = async()=>{
    const id = req.user.id;
    try{
        const deleteProfile = await userSchema.deleteOne({_id: id})
        if(deleteProfile.deletedCount > 0){
            return res.status(200).json({ message: 'Profil supprimé avec succès' });
        }else{
            return res.status(404).json({ message: 'Profil introuvable' });
        }
    }catch(err){
        console.log(err)
        return res.send(500).json({ message: 'Erreur de serveur' });
    }
}