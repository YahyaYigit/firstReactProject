import React, { useState, useEffect } from "react";
import DeleteModal from "./DeleteModal";
import { Link } from "react-router-dom";
import { Pagination } from "react-bootstrap";

const MovieList = (props) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [activePage, setActivePage] = useState(1);
  const moviesPerPage = 9;

  const truncateOverview = (string, maxLength) => {
    return string?.length > maxLength ? `${string.substring(0, maxLength)}...` : string;
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setActivePage(1);
  };

  const filteredMovies = props.movies.filter((movie) => {
    const matchesCategory = selectedCategory ? movie.category === selectedCategory : true;
    const matchesSearchQuery = props.searchQuery
      ? movie.name?.toLowerCase().includes(props.searchQuery.toLowerCase())
      : true;

    return matchesCategory && matchesSearchQuery;
  });

  useEffect(() => {
    const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
    if (activePage > totalPages) setActivePage(1);
  }, [filteredMovies.length, activePage]);

  const indexOfLastMovie = activePage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

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

  const handleAddToCart = (movie) => {
    props.addToCart(movie);  
  };

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="row">
          {currentMovies.map((movie) => (
            <div className="col-lg-4" key={movie.id}>
              <div className="card mb-4 shadow-sm">
                <img
                  src={movie.imageUrl}
                  className="card-img-top w-100"
                  alt={movie.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{movie.name}</h5>
                  <p className="card-text">
                    {truncateOverview(movie.overview, 125)}
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-2">
                      <Link
                        type="button"
                        className="btn btn-md btn-outline-primary"
                        to={`edit/${movie.id}`}
                      >
                        Filmi Düzenle
                      </Link>

                      <DeleteModal
                        deleteMovieProp={props.deleteMovieProp}
                        movie={movie}
                      />
                    </div>

                    <h2>
                      <span className="badge badge-info bg-primary">
                        {movie.rating}
                      </span>
                    </h2>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <div className="d-flex align-items-center gap-3">
                      <h4>${movie.price || 10}</h4>
                    </div>

                    <div className="d-flex justify-content-end w-100">
                      <button
                        className="btn btn-md"
                        style={{
                          backgroundColor: "transparent",
                          border: "2px solid #28a745",
                          color: "#28a745",
                          transition: "all 0.3s ease",
                        }}
                        onClick={() => handleAddToCart(movie)}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "#28a745";
                          e.target.style.color = "#fff";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "transparent";
                          e.target.style.color = "#28a745";
                        }}
                      >
                        Sepete Ekle
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <Pagination>{paginationItems}</Pagination>
      </div>
    </div>
  );
};

export default MovieList;
