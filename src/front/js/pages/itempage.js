import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

export const ItemPage = () => {
    const { itemId } = useParams();
    const [item, setItem] = useState(null);
    const [showQRModal, setShowQRModal] = useState(false);

    useEffect(() => {
        fetch(`${process.env.BACKEND_URL}/api/items/${itemId}`)
            .then(res => res.json())
            .then(data => setItem(data))
            .catch(err => console.error(err));
    }, [itemId]);

    if (!item) return <p className="text-center mt-5">Cargando artículo...</p>;

    const itemURL = window.location.href;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(itemURL)
            .then(() => alert("Enlace copiado al portapapeles"))
            .catch(err => console.error("Error al copiar: ", err));
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-6 mb-4">
                    <div className="">
                        <img
                            src={item.image || "https://via.placeholder.com/500"}
                            alt={item.nombre}
                            className="img-fluid rounded"
                        />
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
                                        src: "/logo.png", // pon tu logo si quieres
                                        height: 100,
                                        width: 100,
                                        excavate: true
                                    }}
                                />

                                <div className="mt-3">
                                    <button
                                        className="btn btn-warning"
                                        onClick={() => setShowQRModal(false)}
                                    >
                                        Cerrar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="col-md-6">
                    <div className="p-4 bg-dark text-light rounded shadow-lg">
                        {Object.entries(item).map(([key, value]) =>
                            value && key !== "id" && key !== "image" && key !== "type_id" ? (
                                <p key={key}>
                                    <strong>{key.replace(/_/g, " ").toUpperCase()}:</strong> {value}
                                </p>
                            ) : null
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
