import React from 'react';

function MenuItem({ image, name, price }) {
  return (
    <div className="menuItem">
      <div className="imageContainer">
        <span className="platform-badge">PS4 / PC</span>
        <img src={image} alt={name} />
      </div>
      <div className="itemInfo">
        <h1>{name}</h1>
        <div className="item-price-row">
          <p>RS {price.toLocaleString()}</p>
          <span className="item-rating">★★★★★</span>
        </div>
        <button className="itemButton">View Details</button>
      </div>
    </div>
  );
}

export default MenuItem;