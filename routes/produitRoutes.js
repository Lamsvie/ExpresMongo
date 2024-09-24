import express from "express";
import { createProduit, getAllProduct, getOneProduct, updateOneProduct, deleteOneProduct } from "../controllers/produitController.js";

const produitRoute = express.Router()

produitRoute.post('/', createProduit)
produitRoute.get('/', getAllProduct)
produitRoute.get('/:id', getOneProduct)
produitRoute.put('/:id', updateOneProduct)
produitRoute.delete('/:id', deleteOneProduct)

export default produitRoute;