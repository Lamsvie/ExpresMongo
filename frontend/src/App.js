import { useEffect, useState } from "react";
import axios from "axios"
import Formulaire from "./components/formulaire";
import Table from "./components/table";


function App() {

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [dataIsAdded, setDataIsAdded] = useState(0)
  const [productId, setProductId] = useState(null)
  const [dataToUpdate, setDataToUpdate] = useState(null)
  

  // Get all products
  const getProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/produits/')
      setProducts(response.data)
      
    } catch (error) {
      console.log(error);
      
    }

  }



  const getCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/categories/')
      setCategories(response.data)
      
    } catch (error) {
      console.log(error);
      
    }

  }

  useEffect(() => {
    
    getProducts()
    getCategories()

  }, [dataIsAdded])

  return (
    <div className="m-auto w-96 flex flex-col gap-4">
      
      { categories.length > 0 && <Formulaire 
        productId={productId} 
        setProductId={setProductId} 
        categories={categories} 
        load={setDataIsAdded} 
        /> }

      { products.length > 0 && <Table products={products} setProductId={setProductId} /> }
    </div>
  );
}

export default App;
