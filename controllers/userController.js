import { User } from "../models/user.js"
import { validate } from "email-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//fonction d'inscription
export const createUser = (req, res, next) =>{
    if (validate(req.body.email) === true) {
        User.findOne({
            email: req.body.email
        }).then((exist) => 
            {
                if (exist) {
                  return res.status(400).json({msg: "This user already exist!"})
                }
                bcrypt.hash(req.body.password, 10).then(hash => {

                    const newuser = new User({
                        email: req.body.email,
                        password: hash,
                        roles: req.body.roles
                    })
                    newuser.save().then(() => res.status(200).json({message: "User added succesfully!!!"}))
                    .catch((err) => res.status(400).json({error: err}))

                }).catch((err) => res.status(400).json({error: err}))
                
            
            })
            .catch((err) => res.status(400).json({error: err}))
    
    }else{
        res.status(400).json({
            message: "Veuillez envoyer une adresse correct"
        })
    }
}


//foinction de connexion

export const login = (req, res, next) => {
    //verifier si le mail exist
    console.log(req.headers.Authorization);
    
    User.findOne({
        email: req.body.email
    }).then((exist) => {
        if (!exist) {
            return res.status(400).json({message: "Login/Password incorrect!!!"})
        }

        //verfier si le password est correcte
        bcrypt.compare(req.body.password, exist.password)
         .then(valid => {
            if (!valid) {
                return res.status(400).json({message: "Login/Password incorrect!!!"})
            }

            //generer un token et envoyer au client
            const payload = {
                userid: exist._id,
                role: exist.roles
            }
            res.status(200).json({ token: jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '24h'}) })
         })
         .catch((err) => res.status(500).json({error: err}))
    })
    .catch((err) => res.status(400).json({error: err}))
}

export const getUsers = (req, res, next) => {
    const Allusers = User.find()
    Allusers.then((users) => res.status(200).json(users))
    .catch((err) => res.status(400).json({
        error: err
    }))
}

export const updateUser = (req, res, next) => {
    if (validate(req.body.email) === true) {
        const userupdated = User.updateOne({
            _id: req.params.id,
            email: req.body.email,
            password: req.body.password
        })
        userupdated.then(() => res.status(200).json({
            message: "User updated successfully!!!"
        }))
        .catch((err) => res.status(400).json({
            error: err
        }))
    }else{
        res.status(500).json({
            message: "Veuillez envoyer une adresse correct"
        })
    }
}

export const deleteUser = (req, res, next) => {
    User.deleteOne({
        _id: req.params.id
    })
    .then(() => res.status(200).json({
        message: "user deleted successfully!!!"
    }))
    .catch((err) => res.status(400).json({
        error: err
    }))
}