import React from 'react'
import './DescriptionBox.css';

export const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="discriptionbox-navigator">
            <div className="discriptionbox-nav-box">Description</div>
            <div className="discriptionbox-nav-box fade">Reviews (122)</div>
        </div>
        <div className="descriptionbox-description">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam at incidunt ducimus quam labore, ratione ut rem ex dignissimos totam natus accusantium dolorum reprehenderit reiciendis vero similique harum porro cumque</p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima voluptates, qui est velit magnam suscipit doloremque aperiam temporibus harum modi rem ad nulla fugit? Nobis ratione ea provident velit inventore!
            </p>
        </div>
    </div>
  )
}
