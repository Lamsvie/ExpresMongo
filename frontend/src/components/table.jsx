import React from 'react';

const Table = ({products, setProductId}) => {

    const handleClick = (id) => {
        setProductId(id)
    }

    return (
        <div>
            <table className='w-full border rounded-lg'>
                <thead>
                    <tr className='border-b font-semibold'>
                        <td className='p-4'>Id</td>
                        <td className='p-4'>Nom</td>
                        <td className='p-4'>Prix</td>
                        <td className='p-4'>Categorie</td>
                    </tr>
                </thead>
                <tbody>
                    { products.map(product => (
                        <tr key={product._id} className='border-b'>
                            <td className='p-4'>{ product._id }</td>
                            <td className='p-4'>{ product.name }</td>
                            <td className='p-4'>{ product.price }</td>
                            <td className='p-4'>{ product.category.name }</td>
                            <td className='p-4 flex gap-2'>
                                <button id={product._id} onClick={(e) => handleClick(e.target.id)} className='bg-blue-500 rounded-md p-1'>Update</button>
                                <button id={product._id} onClick={(e) => handleClick(e.target.id)} className='bg-red-400 rounded-md p-1'>Delete</button>
                            </td>
                        </tr>
                    )) }
                </tbody>
            </table>
        </div>
    );
}

export default Table;
