import { useState, useEffect } from 'react'
import './App.css'
import {useFetch} from "./hooks/useFetch"
const URL = "http://localhost:3000/products"

function App() {
  const [products, setProducts] = useState([])
  const [name, setName] = useState()
  const [price, setPrice] = useState()
  const { data: items, httpConfig, loading, error } = useFetch(URL)




useEffect(()=>{
 
  }, [])
  /*
  async function data(){
   const res = await fetch(URL)
    const data = await res.json()
    setProducts(data)
  }*/
   const handleSubmit = async (e)=> {
      e.preventDefault()
      const product = {
        name,
        price,
      }
      /*
      const res = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
      })

      const addedProduct = await res.json()
      setProducts((prevProducts)=> [...prevProducts, addedProduct])
      */
     httpConfig(product, "POST")

      setPrice("")
      setName("")

   }

  return (
    <div className="App">
      <h1>lista de produtos</h1>

      {loading && <p>carregando dados...</p>}
      {error && <p>{error}</p>}
      {!error && (
      <ul>
        {items && items.map((product)=>(
          <li key={product.id}>
             {product.name} - R$: {product.price}
          </li>
        ))}
      </ul>
      )}
      <div className="add-product">
        <form onSubmit={handleSubmit}>

          <label>
            nome:
            <input 
            type="text" 
            value={name}
            name="name"
            onChange={(e)=>{setName(e.target.value)}}
            />
          </label>

           <label>
            preço:
            <input 
            type="number" 
            value={price}
            name="price"
            onChange={(e)=>{setPrice(e.target.value)}}
            />
           
          </label>
          {loading && <input type="submit" disabled value="aguarde" /> }
          {!loading && <input type="submit" value="criar" /> }

        </form>
      </div>
    </div>
  )
}

export default App
