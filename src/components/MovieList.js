import React, { useState } from "react";
import DeleteModal from "./DeleteModal";

const MovieList = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Menü durumu
  const [selectedCategory, setSelectedCategory] = useState(null); // Seçilen kategori

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Menü görünürlük durumunu değiştir
  };

  // Kategoriye tıklandığında çağrılan fonksiyon
  const handleCategoryClick = (category) => {
    setSelectedCategory(category); // Seçilen kategoriyi güncelle
  };

  // Seçilen kategoriye göre film listesini filtrele
  const filteredMovies = selectedCategory
    ? props.movies.filter((movie) => movie.category === selectedCategory)
    : props.movies;

  return (
    <div className="row">
      <button
        className="btn"
        onClick={toggleMenu}
        style={{
          position: "fixed",
          top: "20px",
          right: "100px",
          zIndex: 1000,
          width: "50px",
          height: "50px",
          fontSize: "50px",
        }}
      >
        &#9776; {/* Üç çizgili menü simgesi */}
      </button>

      {/* Sağdan Açılır Menü */}
      <div
        className={`side-menu ${isMenuOpen ? "open" : ""}`}
        style={{
          position: "fixed",
          top: "0",
          right: isMenuOpen ? "0" : "-100%",
          height: "100%",
          width: "25%",
          backgroundColor: "#f8f9fa",
          transition: "right 0.3s ease",
          boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.3)",
          padding: "20px",
          zIndex: 999,
        }}
      >
        <h2>Kategoriler</h2>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li>
            <button className="btn fs-3" onClick={() => handleCategoryClick("")}>
              Ana Sayfa
            </button>
          </li>
          <li>
            <button className="btn fs-3" onClick={() => handleCategoryClick("heyecan")}>
              Heyecan
            </button>
          </li>
          <li>
            <button className="btn fs-3" onClick={() => handleCategoryClick("gerilim")}>
              Gerilim
            </button>
          </li>
          <li>
            <button className="btn fs-3" onClick={() => handleCategoryClick("korku")}>
              Korku
            </button>
          </li>
        </ul>
      </div>

      {/* Film Listesi */}
      <div className="col-lg-12">
        <div className="row">
          {filteredMovies.map((movie) => (
            <div className="col-lg-4" key={movie.id}>
              <div className="card mb-4 shadow-sm">
                <img
                  src={movie.imageURL}
                  className="card-img-top"
                  alt="Sample Movie"
                />
                <div className="card-body">
                  <h5 className="card-title">{movie.name}</h5>
                  <p className="card-text">{movie.overview}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <DeleteModal
                      deleteMovieProp={props.deleteMovieProp}
                      movie={movie}
                    />
                    <h2>
                      <span className="badge badge-info bg-primary">
                        {movie.rating}
                      </span>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
