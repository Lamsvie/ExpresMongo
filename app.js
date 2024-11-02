//creation App express
import express from "express";
import dbConnect from "./database/dbConnected.js";
import { config } from "dotenv";
import categoryRouter from "./routes/categoryRoutes.js";
import produitRoute from "./routes/produitRoutes.js";
import userRoute from "./routes/userRoutes.js";

const App = express()
App.use(express.json());
App.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

config({ path: "./config/config.env" });

dbConnect()

App.use('/api/categories', categoryRouter)
App.use('/api/produits', produitRoute)
App.use('/api/users', userRoute)


export default App;