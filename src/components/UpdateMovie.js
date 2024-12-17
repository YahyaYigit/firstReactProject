import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import serialize from "form-serialize";
import axios from "axios";

function UpdateMovie(props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [movie, setMovie] = useState({
    name: "",
    rating: "",
    categoryId: "",
    overview: "",
    imageUrl: "",
    price: "", // Yeni fiyat alanı
  });
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7070/api/Film/GetFilm/${id}`
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Film verisi alınırken hata oluştu:", error);
      }
    };

    fetchMovie();
  }, [id]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const updatedMovie = serialize(e.target, { hash: true });

    if (!updatedMovie.overview || updatedMovie.overview.length < 1) {
      alert("Açıklama kısmı boş olamaz!");
      return;
    }

    try {
      const response = await axios.put(
        `https://localhost:7070/api/Film/UpdateFilm/${id}`,
        {
          ...movie,
          ...updatedMovie,
        }
      );

      props.onUpdateMovie(response.data);
      setSuccessMessage("Film başarılı bir şekilde güncellendi.");

      setTimeout(() => {
        setSuccessMessage("");
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Film güncellenirken hata oluştu:", error);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
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
        {successMessage && (
          <div className="alert alert-success text-center">
            {successMessage}
          </div>
        )}

        <input
          className="form-control mb-3"
          id="disabledInput"
          type="text"
          placeholder="Filmi güncellemek için formu düzenleyin.."
          disabled
        />
        <div className="form-row d-flex mb-3">
          <div className="form-group col-md-8 pe-md-2">
            <label htmlFor="inputName">İsim</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={movie.name || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-md-4 ps-md-4 pe-md-0">
            <label htmlFor="inputRating">Rating</label>
            <input
              type="text"
              className="form-control"
              name="rating"
              value={movie.rating || ""}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="inputCategory">Kategori</label>
          <select
            className="form-control"
            name="categoryId"
            value={movie.categoryId || ""}
            onChange={handleChange}
            required
          >
            <option value="">Kategori Seçin</option>
            <option value="1">Savaş</option>
            <option value="2">Aksiyon</option>
            <option value="3">Korku</option>
            <option value="4">Gerilim</option>
            <option value="5">Komedi</option>
            <option value="6">Çizgi Film</option>
          </select>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="inputImageURL">Resim URL</label>
          <input
            type="text"
            className="form-control"
            name="imageUrl"
            value={movie.imageUrl || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="inputPrice">Fiyat</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={movie.price || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row mb-3">
          <div className="form-group col-md-12">
            <label htmlFor="overviewTextarea">Açıklama</label>
            <textarea
              className="form-control"
              name="overview"
              value={movie.overview || ""}
              onChange={handleChange}
              rows="5"
              required
            ></textarea>
          </div>
        </div>
        <input
          type="submit"
          className="btn btn-danger btn-block w-100 mt-4"
          value="Filmi Güncelle"
        />
      </form>
    </div>
  );
}

export default UpdateMovie;
