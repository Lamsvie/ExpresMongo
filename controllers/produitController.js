import { Produit } from "../models/produit.js";


//add new product
export const createProduit = (req, res, next)=>{
    const produit = new Produit({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    });

    produit.save().then(
        () => res.status(201).json({
            message: "new product added succesfully!"
        })
    ).catch(
        (err) => res.status(400).json({
            error: err
        })
    )
}

//get all product
export const getAllProduct = async (req, res, next) => {
    try {
        const allprodut = await Produit.find().populate('category').exec() 
        
        res.status(200).json(allprodut)
    
    } catch (error) {
        return res.status(400).json({
            error: err
        })
    }
}

//get one product
export const getOneProduct = async (req, res, next) => {
    try {
        const getOnProduct = await Produit.findOne({_id: req.params.id}).populate('category').exec()
        
        res.status(200).json(getOnProduct)
        
    } catch (error) {
        res.status(400).json({
            error: err
        })
    }
}

//update one product
export const updateOneProduct = (req, res, next) => {
    Produit.updateOne({
        _id: req.params.id,
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    }).then(() => res.status(200).json({
        message: `This ${req.params.id} product updated successfully!`
    })).catch((err) => res.status(400).json({
        error: err
    }
    ))
}

//delete one product
export const deleteOneProduct = (req, res, next) =>{
    Produit.deleteOne({_id: req.params.id}).then(() => res.status(200).json({
        message: `This ${req.params.id} product deleted successfully!`
    })).catch((err) => res.status(400).json({
        error: err
    }))
}