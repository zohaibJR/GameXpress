import React from "react";
import { MenuList } from "../helpers/MenuList";
import MenuItem from "../components/MenuItem";
import '../styles/Menu.css';

function Menu() {
  return (
    <div className="menu">
      <div className="menu-header">
        <h1 className="menuTitle">Our <span>Collection</span></h1>
        <p className="menu-subtitle">Select Your Next Adventure</p>
      </div>
      <div className="menuList">
        {MenuList.map((menuItem, key) => (
          <MenuItem
            key={key}
            image={menuItem.image}
            name={menuItem.name}
            price={menuItem.Price}
          />
        ))}
      </div>
    </div>
  );
}

export default Menu;