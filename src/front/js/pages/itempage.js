import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const ItemPage = () => {
    const { itemId } = useParams();
    const [item, setItem] = useState(null);

    useEffect(() => {
        fetch(`${process.env.BACKEND_URL}/api/items/${itemId}`)
            .then(res => res.json())
            .then(data => setItem(data))
            .catch(err => console.error(err));
    }, [itemId]);

    if (!item) return <p className="text-center mt-5">Cargando artículo...</p>;

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                {/* Imagen principal tipo card */}
                <div className="col-md-6 mb-4">
                    <div className="">
                        <img
                            src={item.image || "https://via.placeholder.com/500"}
                            alt={item.nombre}
                        />
                        <div className="overlay">
                            <h3>{item.nombre.toUpperCase()}</h3>
                        </div>
                    </div>
                </div>

                {/* Detalles */}
                <div className="col-md-6">
                    <div className="p-4 bg-dark text-light rounded shadow-lg">
                        {Object.entries(item).map(([key, value]) => (
                            value &&
                            key !== "id" &&
                            key !== "image" &&
                            key !== "type_id" && (
                                <p key={key}>
                                    <strong>{key.replace(/_/g, " ").toUpperCase()}:</strong> {value}
                                </p>
                            )
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
