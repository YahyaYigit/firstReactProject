import React from "react";

function Contact() {
  return (
    <div style={{ padding: "30px", textAlign: "center", fontFamily: "Arial, sans-serif", lineHeight: "1.8" }}>
      <h1 style={{ fontSize: "2.5rem", color: "#d32f2f", marginBottom: "20px" }}>İletişim</h1>
      <p style={{ fontSize: "1.2rem", color: "#555" }}>
        Film Sitesi olarak sizlere en iyi deneyimi sunmayı hedefliyoruz. Her türlü soru, öneri ya da teknik destek talepleriniz için 
        bizimle iletişime geçmekten çekinmeyin.
      </p>

      <div style={{ marginTop: "30px" }}>
        <h2 style={{ fontSize: "2rem", color: "#444", marginBottom: "15px" }}>Bize Ulaşın</h2>
        <p style={{ fontSize: "1.1rem" }}>
          📧 <strong>Email:</strong> <a href="mailto:support@filmsitesi.com" style={{ color: "#d32f2f", textDecoration: "none" }}>support@filmsitesi.com</a>
        </p>
        <p style={{ fontSize: "1.1rem" }}>
          📞 <strong>Telefon:</strong> <a href="tel:+901234567890" style={{ color: "#d32f2f", textDecoration: "none" }}>+90 123 456 7890</a>
        </p>
      </div>

      <div style={{ marginTop: "40px" }}>
        <h2 style={{ fontSize: "2rem", color: "#444", marginBottom: "15px" }}>Adresimiz</h2>
        <p style={{ fontSize: "1.1rem", color: "#555" }}>
          Film Sitesi Genel Merkezi <br />
          Örnek Mahallesi, Film Caddesi No: 123 <br />
          İstanbul, Türkiye
        </p>
      </div>

      <div style={{ marginTop: "40px" }}>
        <h2 style={{ fontSize: "2rem", color: "#444", marginBottom: "15px" }}>Çalışma Saatlerimiz</h2>
        <p style={{ fontSize: "1.1rem", color: "#555" }}>
          Pazartesi - Cuma: 09:00 - 18:00 <br />
          Cumartesi: 10:00 - 16:00 <br />
          Pazar: Kapalı
        </p>
      </div>
    </div>
  );
}

export default Contact;
