import React from "react";
import { Link } from "react-router-dom";
import { Cart } from 'react-bootstrap-icons';

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
      <div style={{ fontSize: "29px", fontWeight: "500" }}>
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

        <li style={{ margin: "0 20px", display: "flex", alignItems: "center" }}>
          <Link
            to="/cart"
            style={{
              color: "#fff",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Cart size={30} style={{ marginRight: "5px", marginTop:"-4px",}} />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
