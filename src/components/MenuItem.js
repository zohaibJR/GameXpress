import React from 'react'

function MenuItem({image, name, price}) {
  return (
    <div className="menuItem">
        <div className="imageContainer">
           <img src={image} alt={name} />
        </div>  
        <div className="itemInfo">
            <h1>{name}</h1>
            <p>RS {price}</p>
            <button className="itemButton">View Details</button>
        </div>
    </div>
  );
}

export default MenuItem;