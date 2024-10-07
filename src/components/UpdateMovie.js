import React, { useState } from "react";
import serialize from "form-serialize";
import { useNavigate } from "react-router-dom";

const UpdateMovie = ({ movie, onUpdateMovie }) => {
  const [formData, setFormData] = useState(movie);

  

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedMovie = serialize(e.target, { hash: true });
    onUpdateMovie({ ...movie, ...updatedMovie }); // Güncellenen filmi gönder
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="update-movie-form">
      <form onSubmit={handleFormSubmit}>
        <h2>Film Güncelle</h2>
        <div className="form-group">
          <label htmlFor="name">İsim</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <input
            type="text"
            className="form-control"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="overview">Açıklama</label>
          <textarea
            className="form-control"
            name="overview"
            value={formData.overview}
            onChange={handleChange}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-success" value="Kaydet" />
      </form>
    </div>
  );
};

export default UpdateMovie;
