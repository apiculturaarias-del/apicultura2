import React from "react";
import Logo from "../../img/logo.png";

export const Footer = () => (
  <footer className="footer mt-auto py-3 text-center" style={{ backgroundColor: "#ffcc00" }}>
    <div className="footer-content d-flex justify-content-between align-items-center">
      <div className="copyright text-dark ms-4">
        Copyright © 2025. All rights reserved.
      </div>
      <a className="navbar-brand me-4" href="#">
        <img src={Logo} alt="APIculturaArias Logo" className="navbar-logo" />
      </a>
    </div>
  </footer>
);
