import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../img/logo.png";

export const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Cargar categorías
  useEffect(() => {
    fetch(`${process.env.BACKEND_URL}/api/categories`)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error(err));
  }, []);

  // Buscar artículos
  useEffect(() => {
    if (!searchTerm) return setSearchResults([]);
    const timer = setTimeout(() => {
      fetch(`${process.env.BACKEND_URL}/api/items?search=${encodeURIComponent(searchTerm)}`)
        .then(res => res.json())
        .then(data => setSearchResults(data))
        .catch(err => console.error(err));
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Logout
  const handleLogout = async () => {
    try {
      const res = await fetch(`${process.env.BACKEND_URL}/api/logout`, {
        method: "POST",
        credentials: "include"
      });
      if (!res.ok) throw new Error("Error al cerrar sesión");
      alert("Sesión cerrada");
      const modalEl = document.getElementById("logoutModal");
      const modal = window.bootstrap.Modal.getInstance(modalEl);
      modal.hide();
    } catch (err) {
      console.error(err);
      alert("No se pudo cerrar sesión");
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#ffcc00", position: "relative" }}>
        <div className="container-fluid">
          <Link className="navbar-brand me-3" to="/categorias">
            <img src={Logo} alt="APIculturaArias Logo" className="navbar-logo" />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0">
              
              {/* 🔸 NUEVO BOTÓN: Artículos */}
              <li className="nav-item">
                <Link
                  className="nav-link text-dark fw-bold fs-5 custom-hover"
                  to="/articulos"
                >
                  Artículos
                </Link>
              </li>

              {/* Categorías */}
              <li className="nav-item dropdown custom-dropdown">
                <a
                  className="nav-link text-dark fw-bold fs-5 custom-hover"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categorías
                </a>
                <ul className="dropdown-menu bg-dark">
                  {categories.map(cat => (
                    <li key={cat.id}>
                      <Link className="dropdown-item" to={`/categorias/${cat.id}/types`}>
                        {cat.nombre}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>

            {/* Buscador */}
            <div className="position-relative ms-3">
              <input
                className="form-control"
                type="search"
                placeholder="Buscar Artículo"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchResults.length > 0 && (
                <div
                  className="dropdown-menu show"
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    zIndex: 9999,
                    maxHeight: "300px",
                    overflowY: "auto"
                  }}
                >
                  {searchResults.map(item => (
                    <Link
                      key={item.id}
                      to={`/items/${item.id}`}
                      className="dropdown-item"
                      onClick={() => setSearchTerm("")}
                    >
                      {item.nombre}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Botón logout */}
            <button
              type="button"
              className="btn nav-link text-dark ms-2 me-1 navbar-user"
              data-bs-toggle="modal"
              data-bs-target="#logoutModal"
              aria-label="Cerrar sesión"
              style={{ cursor: "pointer" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" className="bi bi-person-fill-lock" viewBox="0 0 16 16">
                <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5v-1a2 2 0 0 1 .01-.2 4.49 4.49 0 0 1 1.534-3.693Q8.844 9.002 8 9c-5 0-6 3-6 4m7 0a1 1 0 0 1 1-1v-1a2 2 0 1 1 4 0v1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zm3-3a1 1 0 0 0-1 1v1h2v-1a1 1 0 0 0-1-1" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Modal cierre de sesión */}
      <div className="modal fade" id="logoutModal" tabIndex="-1" aria-labelledby="logoutModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-dark text-light">
            <div className="modal-header border-0">
              <h5 className="modal-title" id="logoutModalLabel">Cerrar sesión</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <hr className="custom-white-separator" />
            <div className="modal-body">¿Seguro que quieres cerrar sesión?</div>
            <div className="modal-footer border-0">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" className="btn btn-warning" onClick={handleLogout}>Aceptar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
