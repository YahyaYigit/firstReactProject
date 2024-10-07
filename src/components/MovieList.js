import React, { useState } from "react";
import DeleteModal from "./DeleteModal";
import UpdateMovie from "./UpdateMovie"; // UpdateMovie bileşenini ekle

const MovieList = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editingMovie, setEditingMovie] = useState(null); // Güncelleme için seçilen film

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleEditClick = (movie) => {
    setEditingMovie(movie); // Güncellemek için seçilen filmi ayarla
  };

  const handleUpdateMovie = (updatedMovie) => {
    props.updateMovieProp(updatedMovie); // Güncellenen filmi üst bileşene gönder
    setEditingMovie(null); // Güncelleme formunu kapat
  };

  const filteredMovies = selectedCategory
    ? props.movies.filter((movie) => movie.category === selectedCategory)
    : props.movies;

  return (
    <div className="row">
      {/* ... (menü kodları) ... */}

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
                    <button
                      className="btn btn-md btn-outline-primary" // Güncelleme butonu
                      onClick={() => handleEditClick(movie)}
                    >
                      Güncelle
                    </button>
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

        {/* Güncelleme Formu */}
        {editingMovie && (
          <UpdateMovie
            movie={editingMovie}
            onUpdateMovie={handleUpdateMovie}
          />
        )}
      </div>
    </div>
  );
};

export default MovieList;
