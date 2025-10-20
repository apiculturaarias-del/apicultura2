import React from "react";
import { Link } from "react-router-dom";

export const ItemCard = ({ item }) => {
    // Recortar nombre a 30 caracteres (por ejemplo)
    const shortName = item.nombre
        ? item.nombre.length > 30
            ? item.nombre.substring(0, 30) + "..."
            : item.nombre
        : "";

    // Recortar descripción a 50 caracteres
    const shortDescription = item.descripcion
        ? item.descripcion.length > 50
            ? item.descripcion.substring(0, 50) + "..."
            : item.descripcion
        : "";

    return (
        <div className="box">
            <div className="category-badge bg-warning text-dark">{shortName}</div>
            <img
                src={item.image1 || "https://via.placeholder.com/150"}
                alt={item.nombre}
            />
            <div className="overlay">
                <h3>{shortName.toUpperCase()}</h3>
                {shortDescription && <p>{shortDescription}</p>}
                <Link to={`/items/${item.id}`}>Ver artículo</Link>
            </div>
        </div>
    );
};
