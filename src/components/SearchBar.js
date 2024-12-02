import React from "react";
import { useNavigate } from "react-router-dom";

function SearchBar(props) {
  const navigate = useNavigate();

  const handleSearch = (event) => {
    props.searchMovieProp(event); // Sadece arama sorgusunu güncelle
    // props.resetPage(); // Aktif sayfayı sıfırlama satırını kaldırın
  };

  const handleAddMovieClick = () => {
    navigate("/add");
  };

  return (
    <form>
      <div className="form-row d-flex mb-3 mt-3">
        <div className="col-10">
          <input
            onChange={handleSearch}
            type="text"
            className="form-control"
            placeholder="Search for a movie"
          />
        </div>
        <div className="col-2 d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-md btn-danger"
            onClick={handleAddMovieClick}
          >
            Add Movie
          </button>
        </div>
      </div>
    </form>
  );
}


export default SearchBar;
