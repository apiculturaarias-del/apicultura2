import React from "react";
import { Link } from "react-router-dom";

export const ItemCard = ({ item }) => {
    return (
        <div className="box">
            <div className="category-badge bg-warning text-dark">{item.nombre}</div>
            <img
                src={item.image || "https://via.placeholder.com/150"}
                alt={item.nombre}
            />
            <div className="overlay">
                <h3>{item.nombre.toUpperCase()}</h3>
                <p>{item.descripcion}</p>
                <Link to={`/items/${item.id}`}>Ver artículo</Link>
            </div>
        </div>
    );
};