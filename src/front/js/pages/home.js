import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import Logo from "../../img/logo.png";
import "../../styles/home.css";

export const Home = () => {
    const { actions } = useContext(Context);
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const result = await actions.login(usuario, password);
        if (result.success) {
            navigate("/categorias");
        } else {
            alert(result.message);
        }
    };

    const handleGuest = () => {
        navigate("/categorias");
    };

    return (
        <section className="d-flex flex-column justify-content-center">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img
                            src={Logo}
                            alt="APIculturaArias Logo"
                            className="img-fluid invert-image mt-5 mb-5 d-none d-lg-block"
                        />
                    </div>

                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form onSubmit={handleLogin}>
                            <div className="divider d-flex align-items-center my-4">
                                <h1>Iniciar Sesión</h1>
                            </div>

                            <div className="form-outline mb-4">
                                <input
                                    type="text"
                                    id="username"
                                    className="form-control form-control-lg"
                                    placeholder="Introduzca un usuario"
                                    value={usuario}
                                    onChange={e => setUsuario(e.target.value)}
                                />
                                <label className="form-label" htmlFor="username">Usuario</label>
                            </div>

                            <div className="form-outline mb-3">
                                <input
                                    type="password"
                                    id="password"
                                    className="form-control form-control-lg"
                                    placeholder="Introduzca su contraseña"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                                <label className="form-label" htmlFor="password">Contraseña</label>
                            </div>

                            <div className="text-center text-lg-start mt-4 d-flex gap-3">
                                <button
                                    type="submit"
                                    className="btn btn-warning btn-lg"
                                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                                >
                                    Login
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-secondary btn-lg"
                                    onClick={handleGuest}
                                >
                                    Iniciar como invitado
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};
