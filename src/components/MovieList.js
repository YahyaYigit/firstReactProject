import React, { useState, useEffect, useRef } from "react";
import DeleteModal from "./DeleteModal";
import { Link } from "react-router-dom";
import { Pagination } from "react-bootstrap";

const MovieList = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [activePage, setActivePage] = useState(1);
  const moviesPerPage = 6;

  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const truncateOverview = (string, maxLength) => {
    if (!string) return null;
    if (string.length <= maxLength) return string;
    return `${string.substring(0, maxLength)} ...`;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setActivePage(1);
  };

  // Filtreleme işlemi (kategori ve arama)
  const filteredMovies = props.movies.filter((movie) => {
    const matchesCategory = selectedCategory
      ? movie.category === selectedCategory
      : true;
    const matchesSearchQuery = props.searchQuery
      ? movie.name?.toLowerCase().includes(props.searchQuery.toLowerCase())
      : true;

    return matchesCategory && matchesSearchQuery;
  });

  // Aktif sayfa kontrolü (eğer sayfa aşılırsa 1'e dönme)
  useEffect(() => {
    const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
    if (activePage > totalPages) {
      setActivePage(1); // Aktif sayfa geçersizse birinci sayfaya dön
    }
  }, [filteredMovies.length, activePage]);

  // Sayfa numaralarına göre film dilimleme
  const indexOfLastMovie = activePage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  // Sayfa sayısını hesaplama
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  // Sayfa numaraları oluşturma
  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === activePage}
        onClick={() => setActivePage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  // Menü dışında tıklama ile menüyü kapatma
  const closeMenu = (e) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target) &&
      !buttonRef.current.contains(e.target)
    ) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeMenu);
    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, []);

  return (
    <div className="row">
      <button
        className="btn"
        onClick={toggleMenu}
        ref={buttonRef}
        style={{
          position: "fixed",
          top: "20px",
          left: "10px",
          zIndex: 1000,
          width: "80px",
          height: "50px",
          fontSize: "50px",
          border: "none",
        }}
      >
        &#9776;
      </button>

      <div
        className={`side-menu ${isMenuOpen ? "open" : ""}`}
        ref={menuRef}
        style={{
          position: "fixed",
          top: "0",
          paddingTop: "45px",
          left: isMenuOpen ? "0" : "-100%",
          height: "100%",
          width: "22%",
          backgroundColor: "#f8f9fa",
          transition: "left 0.3s ease",
          boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.3)",
          padding: "20px",
          zIndex: 999,
          paddingLeft: "100px",
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
            <button
              className="btn fs-3"
              onClick={() => handleCategoryClick("heyecan")}
            >
              Heyecan
            </button>
          </li>
          <li>
            <button
              className="btn fs-3"
              onClick={() => handleCategoryClick("gerilim")}
            >
              Gerilim
            </button>
          </li>
          <li>
            <button
              className="btn fs-3"
              onClick={() => handleCategoryClick("korku")}
            >
              Korku
            </button>
          </li>
        </ul>
      </div>

      <div className="col-lg-12">
        <div className="row">
          {currentMovies.map((movie) => (
            <div className="col-lg-4" key={movie.id}>
              <div className="card mb-4 shadow-sm">
                <img
                  src={movie.imageURL}
                  className="card-img-top"
                  alt="Sample Movie"
                />
                <div className="card-body">
                  <h5 className="card-title">{movie.name}</h5>
                  <p className="card-text">
                    {truncateOverview(movie.overview, 200)}
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <h2>
                      <span className="badge badge-info bg-primary">
                        {movie.rating}
                      </span>
                    </h2>

                    <div className="d-flex align-items-center gap-2">
                      <Link
                        type="button"
                        className="btn btn-md btn-outline-primary"
                        to={`edit/${movie.id}`}
                      >
                        Edit
                      </Link>

                      <DeleteModal
                        deleteMovieProp={props.deleteMovieProp}
                        movie={movie}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Pagination>{paginationItems}</Pagination>
      </div>
    </div>
  );
};

export default MovieList;
