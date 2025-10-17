// src/component/SubtypeCard.jsx
import React from "react";
import { Link } from "react-router-dom";

export const SubtypeCard = ({ subtype }) => {
  return (
    <div className="box">
      <div className="category-badge bg-warning text-dark">{subtype.nombre}</div>
      <img
        src={subtype.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSWL1sqHpOPwRToyW_WralTLHf2X_z1CXuBw&s"}
        alt={subtype.nombre}
      />
      <div className="overlay">
        <h3>{subtype.nombre.toUpperCase()}</h3>
        <Link to={`/subtypes/${subtype.id}/items`}>Ver artículos</Link>
      </div>
    </div>
  );
};
