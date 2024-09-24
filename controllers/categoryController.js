
import { set } from "mongoose";
import { category } from "../models/category.js"

//Create new model
export const createCategory = (req, res, next) => {
    const Category = new category({
        name: req.body.name
    });
    Category.save().then(
        () => res.status(201).json({
            message: "New category added successfully!"
        })
    )
    .catch(
        (err) => res.status(400).json({
            error: err
        })
    )
    
}

//get all object
export const getAllCategory = (req, res, next) =>{
    const allcategories = category.find()
    allcategories.then(
        (categories) => res.status(200).json(categories)
    )
    .catch(
        (err) => res.status(400).json({
            error: err
        })
    )
}

//get one object
export const getOneCategory = (req, res, next) =>{
    const onecategory = category.findOne({
        _id: req.params.id
    })
    onecategory.then(
        (thecategory) => res.status(200).json(thecategory)
    ).catch(
        (err) => res.status(400).json({
            error: err
        })
    )
}


//update one object
export const updateOnecategory = (req, res, next) =>{
    const onecategory = category.updateOne({
        _id: req.params.id,
        name: req.body.name
    });

    onecategory.then(() => res.status(200).json({
        message: "object updated succesfully!"
    })).catch(
        (err) => res.status(400).json({error: err})
    )
}


//delete one object
export const deleteOnecategory = (req, res, next) =>{
    category.deleteOne({
        _id: req.params.id
    }).then(() => res.status(200).json({message: "Object deleted successfully!"}))
    .catch(
        (err) => res.status(400).json({error: err})
    )
}