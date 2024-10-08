import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import serialize from "form-serialize";
import ImageUpload from "./imgUpload";
import axios from "axios";

function UpdateMovie(props) {
  const navigate = useNavigate();
  const { id } = useParams(); // URL'den id'yi alıyoruz
  const [movie, setMovie] = useState({
    name: "",
    rating: "",
    category: "",
    overview: "",
    imageURL: "",
  });

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await axios.get(`http://localhost:3002/movies/${id}`);
      setMovie(response.data); // Gelen film verisini state'e kaydediyoruz
    };

    fetchMovie();
  }, [id]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const updatedMovie = serialize(e.target, { hash: true });

    try {
      // API'ye güncellenmiş filmi gönderiyoruz
      const response = await axios.put(`http://localhost:3002/movies/${id}`, {
        ...movie, // Mevcut film verilerini al
        ...updatedMovie, // Formdan gelen yeni verilerle güncelle
        imageURL: movie.imageURL, // Resim URL'sini koru
      });

      // Güncellenen filmi parent bileşene gönder
      props.onUpdateMovie(response.data);

      // Başarılı olduğunda ana sayfaya yönlendir
      navigate("/");
    } catch (error) {
      console.error("Film güncelleme hatası:", error);
    }
  };

  const handleImageUpload = (image) => {
    setMovie((prevMovie) => ({
      ...prevMovie,
      imageURL: image,
    }));
  };

  const handleGoBack = () => {
    navigate(-1); // Bir önceki sayfaya geri dön
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
        style={{ position: 'absolute', top: '60px', left: '50px', fontSize:'30px'}}
      ></button>

      <form className="mt-5" onSubmit={handleFormSubmit}>
        <input
          className="form-control"
          id="disabledInput"
          type="text"
          placeholder="Edit The Form To Update A Movie.."
          disabled
        />
        <div className="form-row d-flex">
          <div className="form-group col-md-10">
            <label htmlFor="inputName">İsim</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={movie.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-md-2 ps-3">
            <label htmlFor="inputRating">Rating</label>
            <input
              type="text"
              className="form-control"
              name="rating"
              value={movie.rating}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="inputCategory">Kategori</label>
          <select
            className="form-control"
            name="category"
            value={movie.category || ""}
            onChange={handleChange}
            required
          >
            <option value="">Kategori Seçin</option>
            <option value="Heyecan">Heyecan</option>
            <option value="Gerilim">Gerilim</option>
            <option value="Korku">Korku</option>
          </select>
        </div>

        <ImageUpload onImageUpload={handleImageUpload} />

        <div className="form-row">
          <div className="form-group col-md-12">
            <label htmlFor="overviewTextarea">Açıklama</label>
            <textarea
              className="form-control"
              name="overview"
              value={movie.overview}
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
