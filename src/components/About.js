import React from "react";

function About() {
  return (
    <div style={{ padding: "30px", textAlign: "center", fontFamily: "Arial, sans-serif", lineHeight: "1.8" }}>
      <h1 style={{ fontSize: "2.5rem", color: "black", marginBottom: "20px" }}>Hakkımızda</h1>
      <p style={{ fontSize: "1.2rem", color: "#555" }}>
        Film Sitesi, sinemaseverler için özel olarak tasarlanmış bir platformdur. En iyi filmleri keşfetmenizi,
        kendi favorilerinizi oluşturmanızı ve benzersiz bir izleme deneyimi yaşamanızı sağlıyoruz.
      </p>

      <div style={{ marginTop: "40px" }}>
        <h2 style={{ fontSize: "2rem", color: "#444", marginBottom: "15px" }}>Misyonumuz</h2>
        <p style={{ fontSize: "1.1rem", color: "#555" }}>
          Film dünyasının büyüleyici atmosferini herkes için erişilebilir hale getirmek, sinema tutkunlarına
          ilham vermek ve onların en sevdikleri filmleri kolayca bulmalarına yardımcı olmak.
        </p>
      </div>

      <div style={{ marginTop: "40px" }}>
        <h2 style={{ fontSize: "2rem", color: "#444", marginBottom: "15px" }}>Neler Sunuyoruz?</h2>
        <p style={{ fontSize: "1.1rem", color: "#555" }}>
          - Geniş bir film koleksiyonu: Aksiyon, drama, komedi, korku ve daha fazlası. <br />
          - Kişiselleştirilmiş öneriler: İlgi alanlarınıza göre öneriler. <br />
          - Kategorilere göre arama ve filtreleme. <br />
          - Detaylı film incelemeleri ve puanlama.
        </p>
      </div>

      <div style={{ marginTop: "40px" }}>
        <h2 style={{ fontSize: "2rem", color: "#444", marginBottom: "15px" }}>Vizyonumuz</h2>
        <p style={{ fontSize: "1.1rem", color: "#555" }}>
          Teknolojiyi kullanarak sinema tutkunlarının bir araya geldiği, interaktif ve dinamik bir topluluk yaratmak.
          Sinemanın büyüsünü herkesin evine taşımak.
        </p>
      </div>

      <div style={{ marginTop: "40px" }}>
        <h2 style={{ fontSize: "2rem", color: "#444", marginBottom: "15px" }}>Bize Katılın</h2>
        <p style={{ fontSize: "1.1rem", color: "#555" }}>
          Film Sitesi'nde yer alan topluluğumuza katılın, favori filmlerinizi paylaşın ve film dünyasının bir
          parçası olun. Sinema tutkusunu birlikte büyütelim!
        </p>
      </div>
    </div>
  );
}

export default About;
