import express from "express";
import { createUser, getUsers, updateUser, deleteUser, login } from "../controllers/userController.js";


const userRoute = express.Router()

userRoute.post("/", createUser)
userRoute.post("/login", login)
userRoute.get("/", getUsers)
userRoute.put("/:id", updateUser)
userRoute.delete("/:id", deleteUser)

export default userRoute;
