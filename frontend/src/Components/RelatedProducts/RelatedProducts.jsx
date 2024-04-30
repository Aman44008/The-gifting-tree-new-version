import React, { useEffect, useState } from 'react'
import './RelatedProducts.css';
import { Items } from '../Items/Items';


export const RelatedProducts = () => {

  const[data_product, setData_product] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:4000/relatedproducts')
    .then((res)=>res.json())
    .then((data)=>{setData_product(data)})
  },[])
  
  return (
    <div className='relatedproducts'>
        <h1>Related Products</h1>
        <hr />
        <div className='relatedproducts-item'>
            {data_product.map((item, i)=>{
                return <Items key={i} id={item.id} name = {item.name} image={item.image} height={"250px"} new_price = {item.new_price} old_price = {item.old_price}/>
            })}
        </div>
    </div>
  )
}
