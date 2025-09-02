import React from "react";
import { Link } from "react-router-dom";

export const Card = ({ category }) => {
  return (
    <div className="box">
      <div className="category-badge bg-warning text-dark">{category.nombre}</div>
      <img
        src={category.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSWL1sqHpOPwRToyW_WralTLHf2X_z1CXuBw&s"} 
        alt={category.nombre}
      />
      <div className="overlay">
        <h3>{category.nombre.toUpperCase()}</h3>
        <p>{category.descripcion}</p>
<Link to={`/categorias/${category.id}/types`}>Ver tipos</Link>
      </div>
    </div>
  );
};