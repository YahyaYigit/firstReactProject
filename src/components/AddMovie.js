// AddMovie.js
import React from "react";
import serialize from "form-serialize";
import { useNavigate } from "react-router-dom";
import ImageUpload from "./imgUpload";

function AddMovie(props) {
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newMovie = serialize(e.target, { hash: true });
    console.log(newMovie);
    props.onAddMovie(newMovie);
    navigate("/");
  };

  const handleImageUpload = (image) => {
    // Burada resmi işlemek için istediğiniz işlemi yapabilirsiniz
    console.log("Yüklenen Resim:", image);
  };

  return (
    <div className="container">
      <form className="mt-5" onSubmit={handleFormSubmit}>
        <input
          className="form-control"
          id="disabledInput"
          type="text"
          placeholder="Fill The Form To Add A Movie.."
          disabled
        />
        <div className="form-row d-flex">
          <div className="form-group col-md-10">
            <label htmlFor="inputName">Name</label>
            <input type="text" className="form-control" name="name" />
          </div>
          <div className="form-group col-md-2 ps-3">
            <label htmlFor="inputRating">Rating</label>
            <input type="text" className="form-control" name="rating" />
          </div>
        </div>
        <ImageUpload onImageUpload={handleImageUpload} /> {/* Burada onImageUpload propunu geçiyoruz */}
        <div className="form-row">
          <div className="form-group col-md-12">
            <label htmlFor="overviewTextarea">Overview</label>
            <textarea
              className="form-control"
              name="overview"
              rows="5"
            ></textarea>
          </div>
        </div>
        <input
          type="submit"
          className="btn btn-danger btn-block w-100 mt-4"
          value="Add Movie"
        />
      </form>
    </div>
  );
}

export default AddMovie;
