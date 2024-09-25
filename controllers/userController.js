import { User } from "../models/user.js"
import { validate } from "email-validator";

export const createUser = (req, res, next) =>{
    if (validate(req.body.email) === true) {
        const newuser = new User({
            email: req.body.email,
            password: req.body.password
        })
    
        newuser.save().then(() => res.status(201).json({
            message: "User added successfully!!!"
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