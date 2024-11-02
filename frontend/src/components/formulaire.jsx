import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Formulaire = ({ categories, load, productId, setProductId }) => {

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState({ id: "", name: "Choose the catecory" })

    // Get one product
    const getOneProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/produits/${productId}`)

            setName(response.data.name)
            setPrice(response.data.price)
            setCategory(response.data.category._id)

        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        if (productId) {
            getOneProduct()
        }
    }, [productId])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            if (productId) {
                //update product
                console.log(name, price, category);

                
                const update = await axios.put(
                    `http://localhost:8000/api/produits/${productId}`,
                    {
                        name,
                        price,
                        category
                    })
                    load(update.data.status)
                    setProductId(null)
            } else {
                //post product
                const request = await axios.post('http://localhost:8000/api/produits/', {
                    name,
                    price,
                    category
                })
                load(request.data.status)
            }



            setName("")
            setPrice("")
            setCategory({ id: "", name: "Choose the catecory" })

        } catch (error) {
            console.log(error);

        }
    }



    return (
        <div className='p-4 border-2 rounded-md'>



            <form onSubmit={handleSubmit} action="" className='flex flex-col gap-2'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="">Nom :</label>
                    <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className='border rounded-md h-8 border-gray-500' />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="">Prix :</label>
                    <input type="number" required value={price} onChange={(e) => setPrice(e.target.value)} className='border rounded-md h-8 border-gray-500' />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="">Category :</label>
                    <select name="" value={category} onChange={(e) => setCategory(e.target.value)} id="" className='border rounded-md h-8 border-gray-500'>
                        <option value={category.id}>{category.name}</option>
                        {categories.map(cat => (

                            <option key={cat._id} value={cat._id} selected >{cat.name}</option>
                        ))}
                    </select>
                </div>
                <button type='submit' className='bg-blue-500 text-white font-medium px-4 py-1 rounded-md'> {productId ? "Update" : "Ajouter"} </button>
            </form>
        </div>
    );
}

export default Formulaire;
