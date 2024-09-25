import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";



const userschema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
})
userschema.plugin(mongooseUniqueValidator);

export const User = mongoose.model("User", userschema)