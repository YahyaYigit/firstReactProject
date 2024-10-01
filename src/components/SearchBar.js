import React from "react";
import { useNavigate } from "react-router-dom";

function SearchBar(props) {
  const navigate = useNavigate();
  const handlFeFormSubmit = (event) => {
    event.preventDefault();
    navigate("/add");
  };

  return (
    <form onSubmit={handlFeFormSubmit}>
      <div className="form-row d-flex mb-3 mt-3">
        <div className="col-10">
          <input
            onChange={props.searchMovieProp}
            type="text"
            className="form-control"
            placeholder="search a movie"
          />
        </div>
        <div className="col-2 d-flex justify-content-end">
          <button type="button" className="btn btn-md btn-danger" onClick={handlFeFormSubmit}>
            Add Movie
          </button>
        </div>
      </div>
    </form>
  );
}

export default SearchBar;
