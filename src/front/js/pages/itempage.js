import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

export const ItemPage = () => {
    const { itemId } = useParams();
    const [item, setItem] = useState(null);
    const [showQRModal, setShowQRModal] = useState(false);
    const [user, setUser] = useState(null); // Estado para la sesión

    useEffect(() => {
        // Fetch del item
        fetch(`${process.env.BACKEND_URL}/api/items/${itemId}`)
            .then(res => res.json())
            .then(data => setItem(data))
            .catch(err => console.error(err));

        // Fetch del usuario (sesión) con cookies
        fetch(`${process.env.BACKEND_URL}/api/session`, { credentials: "include" })
            .then(res => res.json())
            .then(data => {
                console.log("Sesión recibida:", data); // Para debug
                setUser(data.user); // null si no hay sesión
            })
            .catch(err => setUser(null));
    }, [itemId]);

    if (!item) return <p className="text-center mt-5">Cargando artículo...</p>;

    const itemURL = window.location.href;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(itemURL)
            .then(() => alert("Enlace copiado al portapapeles"))
            .catch(err => console.error("Error al copiar: ", err));
    };

    // Campos sensibles que solo se muestran si hay sesión iniciada
    const sensitiveFields = ["numero_piezas", "precio_compra", "valoracion_actual", "observaciones"];

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-6 mb-4">
                    <div className="">
                        <div className="carousel slide" id="itemCarousel" data-bs-ride="carousel">
                            <div className="carousel-indicators">
                                {[item.image1, item.image2, item.image3, item.image4].map((img, index) =>
                                    img ? (
                                        <button
                                            key={index}
                                            type="button"
                                            data-bs-target="#itemCarousel"
                                            data-bs-slide-to={index}
                                            className={index === 0 ? "active" : ""}
                                            aria-current={index === 0 ? "true" : undefined}
                                            aria-label={`Slide ${index + 1}`}
                                        ></button>
                                    ) : null
                                )}
                            </div>

                            <div className="carousel-inner">
                                {[item.image1, item.image2, item.image3, item.image4].map((img, index) =>
                                    img ? (
                                        <div
                                            key={index}
                                            className={`carousel-item ${index === 0 ? "active" : ""}`}
                                        >
                                            <img src={img} className="d-block w-100 rounded" alt={`${item.nombre} ${index + 1}`} />
                                        </div>
                                    ) : null
                                )}
                            </div>

                            <button className="carousel-control-prev" type="button" data-bs-target="#itemCarousel" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#itemCarousel" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>

                        <div className="overlay">
                            <h3>{item.nombre.toUpperCase()}</h3>
                        </div>
                    </div>

                    <div className="mt-3 d-flex gap-2 justify-content-center">
                        <button className="btn btn-warning" onClick={copyToClipboard}>
                            Copiar enlace
                        </button>
                        <button className="btn btn-secondary" onClick={() => setShowQRModal(true)}>
                            Generar QR
                        </button>
                    </div>

                    {showQRModal && (
                        <div
                            style={{
                                position: "fixed",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                backgroundColor: "rgba(0,0,0,0.7)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                zIndex: 1050,
                            }}
                            onClick={() => setShowQRModal(false)}
                        >
                            <div
                                style={{
                                    backgroundColor: "#fff",
                                    padding: "20px",
                                    borderRadius: "12px",
                                    textAlign: "center",
                                    position: "relative",
                                }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <h5 className="mb-3">{item.nombre.toUpperCase()}</h5>

                                <QRCodeCanvas
                                    value={itemURL}
                                    size={300}
                                    bgColor="#ffffffff"
                                    fgColor="#000000ff"
                                    level="H"
                                    includeMargin={true}
                                    imageSettings={{
                                        src: "/logo.png",
                                        height: 100,
                                        width: 100,
                                        excavate: true
                                    }}
                                />

                                <div className="mt-3">
                                    <button className="btn btn-warning" onClick={() => setShowQRModal(false)}>
                                        Cerrar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="col-md-6">
                    <div className="p-4 bg-dark text-light rounded shadow-lg">
                        {Object.entries(item).map(([key, value]) => {
                            if (!value) return null;

                            const excluded = ["id", "image1", "image2", "image3", "image4", "subtype_id"];
                            if (excluded.includes(key)) return null;

                            // 🔹 Solo mostrar sensibles si hay sesión
                            if (!user && sensitiveFields.includes(key)) return null;
                            let displayValue = value;

                            // 🔹 Añadir ceros delante a numero_registro_general
                            if (key === "numero_registro_general") {
                                displayValue = value.toString().padStart(3, "0");
                            }

                            // 🔹 Añadir símbolo de euro a precios
                            if (key === "precio_compra" || key === "valoracion_actual") {
                                displayValue = `${value} €`;
                            }
                            return (
                                <p key={key}>
                                    <strong>{key.replace(/_/g, " ").toUpperCase()}:</strong> {value}
                                </p>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
