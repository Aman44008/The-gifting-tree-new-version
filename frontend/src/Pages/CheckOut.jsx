import React,{useState} from 'react'
import '../Pages/css/CheckOut.css';
import upload_area_icon from '../Components/Assets/upload_area_icon.png';
import { useNavigate } from 'react-router-dom';

export const CheckOut = () => {
    const navigate = useNavigate();

  const [image, setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name : "",
        phone_no: "",
        pincode: "",
        locality: "",
        address: "",
        city: "",
        state: "",
        landmark: "",
        alternet_no: "",
        image: "",
    })

    const changeHandler = (e) =>{
        setProductDetails({...productDetails,[e.target.name]:e.target.value})
    }

    const imageHandler = (e)=>{
        setImage(e.target.files[0]);
    }

    const Add_Product = async()=>{
        console.log(productDetails);
        let responseData;
        let product = productDetails;

        let formData = new FormData();
        formData.append('product', image);
        await fetch('http://localhost:4000/insert', {
            method:'POST',
            headers:{
                Accept:'application/json',
            },
            body:formData,
        }).then((res)=> res.json()).then((data)=>{responseData = data})

        if(responseData.success){
            product.image = responseData.image_url;
            await fetch('http://localhost:4000/checkout', {
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(product),
            }).then((res) => res.json()).then((data) => {
                if (data.success) {
                    alert("Order Placed");
                    navigate('/');
                } else {
                    alert("Failed");
                }
            })
        }

    }
  return (
    <div className='add-product'>
      <h1 className='contact'>Contact Details</h1>
        <div className="line1">
            <input value={productDetails.name} onChange={changeHandler} type="text"  name='name' placeholder='Name'/>
            <input value={productDetails.phone_no} onChange={changeHandler} type="text"  name='phone_no' placeholder='Phone'/>
        </div>
        <div className="line1">
              <input value={productDetails.pincode} onChange={changeHandler} type="text" name='pincode' placeholder='Pincode'/>
              <input value={productDetails.locality} onChange={changeHandler} type="text" name='locality' placeholder='Locality'/>
        </div>
        <div className='address'>
            <input value={productDetails.address} onChange={changeHandler} type="text" name='address' placeholder='Addess'/>
        </div>
        <div className="line1">
          <input value={productDetails.city} onChange={changeHandler} type="text" name='city' placeholder='City'/>
          <input value={productDetails.state} onChange={changeHandler} type="text" name='state' placeholder='State'/>
        </div>
        <div className='line1'>
          <input value={productDetails.landmark} onChange={changeHandler} type="text" name='landmark' placeholder='Landmark'/>
          <input value={productDetails.alternet_no} onChange={changeHandler} type="text" name='alternet_no' placeholder='Alternate Number'/>
        </div>
        <div className="addproduct-itemfield">
            <label htmlFor="file-input">
                <img src={image ? URL.createObjectURL(image) :upload_area_icon} className='addproduct-thumnail-img' alt="" />
            </label>
            <input onChange={imageHandler} type="file" name='image' id='file-input' hidden/>
        </div>
        <button onClick={Add_Product} className='addproduct-btn'>Place Order</button>
    </div>
  )
}
