import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import serialize from "form-serialize";
import axios from "axios";

function AddMovie(props) {
  const navigate = useNavigate();
  const [imageURL, setImageURL] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newMovie = serialize(e.target, { hash: true });

    if (!newMovie.name || !newMovie.rating || !newMovie.categoryId || !newMovie.imageUrl || !newMovie.overview || !newMovie.price) {
      alert("Lütfen tüm alanları doldurduğunuzdan emin olun!");
      return;
    }

    const movieData = { 
      ...newMovie, 
      imageUrl: imageURL,
      price: parseFloat(newMovie.price), 
    };

    console.log("Gönderilecek Film Verisi:", movieData); 

    try {
      console.log("geldasdasdasi",movieData)
      const response = await axios.post("https://localhost:7070/api/Film/CreateFilm", movieData);

      const filmsResponse = await axios.get("https://localhost:7070/api/Film");

      //props.onAddMovie(filmsResponse.data);

      navigate("/");

    } catch (error) {
      console.error("Film eklenirken hata oluştu:", error);
      alert("Film eklenirken hata oluştu: " + (error.response?.data?.message || error.message));
    }
  };

  const handleImageURLChange = (e) => {
    setImageURL(e.target.value); 
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="container">
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={handleGoBack}
        style={{
          position: "absolute",
          top: "83px", 
          right: "33px",
          fontSize: "30px",
        }}
      ></button>

      <form className="mt-5" onSubmit={handleFormSubmit}>
        <input
          className="form-control mb-3"
          id="disabledInput"
          type="text"
          placeholder="Fill The Form To Add A Movie.."
          disabled
        />
        <div className="form-row d-flex mb-3">
          <div className="form-group col-md-8 pe-md-2">
            <label htmlFor="inputName">Name</label>
            <input type="text" className="form-control" name="name"  placeholder="Enter the movie name" required />
          </div>
          <div className="form-group col-md-4 ps-md-4">
            <label htmlFor="inputRating">Rating</label>
            <input type="number" className="form-control"  placeholder="Enter the movie rating" name="rating" required />
          </div>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="inputCategory">Category</label>
          <select className="form-control" name="categoryId" required>
            <option value="">Select Category</option>
            <option value="1">Savaş</option>
            <option value="2">Aksiyon</option>
            <option value="3">Korku</option>
            <option value="4">Gerilim</option>
            <option value="5">Komedi</option>
            <option value="6">Çizgi Film</option>
          </select>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="inputImageUrl">Image URL</label>
          <input
            type="text"
            className="form-control"
            name="imageUrl"
            value={imageURL}
            onChange={handleImageURLChange}
            placeholder="Enter the image URL"
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="overviewTextarea">Overview</label>
          <textarea
            className="form-control"
            name="overview"
            rows="5"
             placeholder="Enter the movie overview"
            required
          ></textarea>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="inputPrice">Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            step="0.01"
            placeholder="Enter the movie price"
            required
          />
        </div>

        <input
          type="submit"
          className="btn btn-success btn-block w-100 mt-4"
          value="Add Movie"
        />
      </form>
    </div>
  );
}

export default AddMovie;
