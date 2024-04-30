import React, { useEffect, useState } from 'react'
import './Popular.css';
import { Items } from '../Items/Items';

export const Popular = () => {

  const[popularProducts, setPopularProducts] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:4000/popular')
    .then((res) => res.json())
    .then((data)=>setPopularProducts(data));
  },[])

  return (
    <div className='popular'>
        <h1>POPULAR</h1>
        <hr />
        <div className="popular-item">
            {popularProducts.map((item, i)=>{
                return <Items key={i} id={item.id} name={item.name} image={item.image} new_price ={item.new_price} height = {"300px"} old_price={item.old_price}/>
            })}
        </div>
    </div>
  )
}
