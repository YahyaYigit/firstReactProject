import React from "react";
import { useNavigate } from "react-router-dom";
import "./SideBar.css";

function SearchBar(props) {
  const navigate = useNavigate();

  const handleSearch = (event) => {
    props.searchMovieProp(event);
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
            placeholder="Bir Film Ara"
          />
        </div>
        <div className="col-2 d-flex justify-content-end align-items-center">
          <button
            type="button"
            className="addbtn btn btn-md badge badge-info bg-primary"
            onClick={handleAddMovieClick}
          >
            Film Ekle
          </button>
        </div>
      </div>
    </form>
  );
}

export default SearchBar;
