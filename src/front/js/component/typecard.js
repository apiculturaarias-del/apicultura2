import React from "react";
import { Link } from "react-router-dom";

export const TypeCard = ({ type }) => {
  return (
    <div className="box">
      <div className="category-badge bg-warning text-dark">{type.nombre}</div>
      <img
        src={type.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSWL1sqHpOPwRToyW_WralTLHf2X_z1CXuBw&s"}
        alt={type.nombre}
      />
      <div className="overlay">
        <h3>{type.nombre.toUpperCase()}</h3>
        <p>{type.descripcion}</p>
        <Link to={`/types/${type.id}/items`}>Ver artículos</Link>
      </div>
    </div>
  );
};
