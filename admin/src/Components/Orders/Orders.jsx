import React,{useState, useEffect} from 'react'
import cross_icon from '../../assets/cross_icon.png'

const Orders = () => {

    const [allproducts, setAllProducts] = useState([]);
    const fetchInfo = async()=>{
        await fetch('http://localhost:4000/allorders')
        .then((res)=> res.json())
        .then((data)=>{setAllProducts(data)});
    }

    useEffect(()=>{
        fetchInfo();
    },[])

    const remove_product = async(id)=>{
        await fetch('http://localhost:4000/completeorder',{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({id:id})
        })
        await fetchInfo();
    }

  return (
        <div className='list-product'>
            <h1>All Orders List</h1>
            <div className="listproduct-format-main">
                <p>Products</p>
                <p>Name</p>
                <p>Address</p>
                <p>Date</p>
                {/* <p>Category</p> */}
                <p>Complete</p>
            </div>
            <div className="listproduct-allproducts">
                <hr />
                {allproducts.map((product,index)=>{
                    return <><div key={index} className='listproduct-format-main listproduct-format'>
                    <img className='listproduct-product-icon' src={product.image} alt="" />
                    <p>{product.name}</p>
                    <p>{product.phone_no},{product.alternet_no}, {product.locality}, {product.address}, {product.city}, {product.state}, {product.pincode} </p>
                    <p>{product.date}</p>
                    {/* <p>{product.category}</p> */}
                    <img onClick={()=>{remove_product(product.id)}} className='listproduct-remove-icon' src={cross_icon} alt="" />
                    </div>
                    <hr />
                    </>
                })}
            </div>
        </div>
  )
}

export default Orders