import React from 'react'

function MenuItem({image, name, price}) {
  return (
    <div className="menuItem">
        <div style={{ backgroundImage: `url(${image})` }}></div>  
        <h1>{name}</h1>
        <p>RS :- {price}</p>

    </div>
  );
}

export default MenuItem