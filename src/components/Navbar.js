import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cart } from 'react-bootstrap-icons';

function NavBar(props) {
  const [cartCount, setCartCount] = useState(props.cartLength);

  // Dinamik olarak cart sayısını güncelleme
  useEffect(() => {
    setCartCount(props.cartLength);
  }, [props.cartLength]);

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

        <li
          style={{
            margin: "0 20px",
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Link
            to="/cart"
            style={{
              color: "#fff",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}
          >
            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-10px",
                  backgroundColor: "#ff6347",
                  borderRadius: "50%", // Daha yuvarlak hale getirmek için
                  color: "#fff",
                  padding: "5px 8px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  animation: "scaleUp 0.3s ease",
                  width: "20px", // Sabit genişlik
                  height: "20px", // Sabit yükseklik
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center", // Sayıyı ortalamak için
                }}
              >
                {cartCount}
              </span>
            )}
            <Cart size={24} style={{ marginRight: "8px", marginTop: "-2px" }} />
          </Link>
        </li>
      </ul>

      {/* CSS for animation */}
      <style>
        {`
          @keyframes scaleUp {
            0% {
              transform: scale(0.8);
              opacity: 0;
            }
            50% {
              transform: scale(1.2);
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}
      </style>
    </nav>
  );
}

export default NavBar;
