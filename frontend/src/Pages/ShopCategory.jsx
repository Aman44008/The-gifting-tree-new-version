import React, { useContext } from 'react'
import './css/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import { Items } from '../Components/Items/Items';

const ShopCategory = (props) => {
  const {all_product} = useContext(ShopContext);
  return (
    <div className='shop-category'>
        <img className='shopcategory-banner' src={props.banner} alt=""/>
        <div className="shopcategory-indexsort">
          <p>
            <span>showing 1-12</span> out of 52 products
          </p>
          <div className="shopcategory-sort">
            Sort by <img src={dropdown_icon} alt="" />
          </div>
        </div>
        <div className="shopcategory-products">
          {all_product.map((item, i)=>{
            if(props.category === item.category){
              return <Items key={i} id={item.id} name={item.name} image={item.image} new_price ={item.new_price} height = {"300px"} old_price={item.old_price}/>
            }
          })};
        </div>
        <div className="shopcategory-loadmore">
          Explore More
        </div>
    </div>
  )
}

export default ShopCategory;
