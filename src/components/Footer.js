import React from "react";

function Footer() {
  return (
    <footer
      style={{
        left: "0",
        right: "0",
        width: "100%",
        backgroundColor: "#222",  
        color: "#fff",
        padding: "40px 0",  
        textAlign: "center",
        marginTop: "50px",
        borderTop: "1px solid #444",
      }}
    >
      <div style={{ marginBottom: "20px" }}>
        <p style={{ margin: 0, fontSize: "16px" }}>
          © {new Date().getFullYear()} Film Sitesi. Tüm hakları saklıdır.
        </p>
        <p style={{ margin: "10px 0", fontSize: "14px" }}>
          Bizi takip edin:
        </p>
      </div>

      <div style={{ fontSize: "20px", marginBottom: "20px" }}>
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            margin: "0 15px",
            color: "#fff",
            textDecoration: "none",
          }}
        >
          <i className="fab fa-facebook" style={{ fontSize: "24px" }}></i>
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            margin: "0 15px",
            color: "#fff",
            textDecoration: "none",
          }}
        >
          <i className="fab fa-twitter" style={{ fontSize: "24px" }}></i>
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            margin: "0 15px",
            color: "#fff",
            textDecoration: "none",
          }}
        >
          <i className="fab fa-instagram" style={{ fontSize: "24px" }}></i>
        </a>
      </div>

      <div style={{ fontSize: "14px" }}>
        <p style={{ margin: "10px 0" }}>Film Sitesi hakkında daha fazla bilgi edinin</p>
        <a
          href="/about"
          style={{
            color: "#fff",
            textDecoration: "underline",
          }}
        >
          Hakkımızda
        </a>
        <span> | </span>
        <a
          href="/contact"
          style={{
            color: "#fff",
            textDecoration: "underline",
          }}
        >
          İletişim
        </a>
      </div>
    </footer>
  );
}

export default Footer;
