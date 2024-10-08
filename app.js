//creation App express
import express from "express";
import dbConnect from "./database/dbConnected.js";
import { config } from "dotenv";
import categoryRouter from "./routes/categoryRoutes.js";
import produitRoute from "./routes/produitRoutes.js";
import userRoute from "./routes/userRoutes.js";

const App = express()
App.use(express.json());

config({ path: "./config/config.env" });

dbConnect()

App.use('/api/categories', categoryRouter)
App.use('/api/produits', produitRoute)
App.use('/api/users', userRoute)


export default App;