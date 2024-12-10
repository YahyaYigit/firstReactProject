import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 20px",
        backgroundColor: "#222",
        color: "#fff",
      }}
    >
      <div style={{ fontSize: "24px", fontWeight: "bold" }}>
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
          Film Sitesi
        </Link>
      </div>

      <ul
        style={{
          listStyleType: "none",
          display: "flex",
          margin: 0,
          padding: 0,
        }}
      >
        <li style={{ margin: "0 20px" }}>
          <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
            Ana Sayfa
          </Link>
        </li>
        <li style={{ margin: "0 20px" }}>
          <Link to="/about" style={{ color: "#fff", textDecoration: "none" }}>
            Hakkımızda
          </Link>
        </li>
        <li style={{ margin: "0 20px" }}>
          <Link
            to="/contact"
            style={{ color: "#fff", textDecoration: "none" }}
          >
            İletişim
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
