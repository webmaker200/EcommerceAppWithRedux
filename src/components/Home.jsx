import React, {useState} from 'react'
import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { addToCart } from '../store/CartSlice';
import conf from '../conf/conf'

function Home() {

    const [data, setData] = useState([])
    const dispatch = useDispatch()
    // console.log(conf.api_url);
    useEffect(() => {
      fetch(conf.api_url).then((response) => {
        return response.json()
      }).then((response) => setData(response))
    }, [])
    //console.log(data);
  
    const handleAddToCart = (id, title, description, category, price, quantity=1, image)=>{
      const product =  {id, title, description, category, price, quantity, image}
     // console.log("Dispatching addToCart with:", product);
      dispatch(addToCart(product))
    }


  return (
    <>
   
      <h1 className='mt-8 text-4xl mb-2 font-bold uppercase'>Product</h1>

      <div className='grid grid-cols-4 gap-5'>
        {
          data.map((product) => (
            <div key={product.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-2">
              <a href="#">
                <img className="rounded-t-lg" src={product.image} width={400} height={150} alt="" />
              </a>
              <div className="p-5">
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{product.category}</p>
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white product-title">{product.title}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">${product.price}</p>
                <button 
                onClick={()=>
                handleAddToCart(
                  product.id, 
                  product.title, 
                  product.description, 
                  product.category, 
                  product.price,
                  1,
                  product.image
                  )} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                 
                  Add to cart
                  <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        }
      </div>



      {/* <ul>
        {data.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul> */}
    </>
  )
}

export default Home
