import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import serialize from "form-serialize";
import ImageUpload from "./imgUpload";

function AddMovie(props) {
  const navigate = useNavigate();
  const [imageURL, setImageURL] = useState(""); // Resim URL'si için state

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newMovie = serialize(e.target, { hash: true });
    // Resim URL'sini yeni filme ekle
    props.onAddMovie({ ...newMovie, imageURL });
    navigate("/"); // Form gönderildikten sonra anasayfaya yönlendirme
  };

  const handleImageUpload = (image) => {
    setImageURL(image); // Yüklenen resmin URL'sini state'e kaydet
    console.log("Yüklenen Resim:", image);
  };

  const handleGoBack = () => {
    navigate(-1); // Bir önceki sayfaya geri dön
  };

  
  return (
    <div className="container">
      <button 
        type="button" 
        className="btn-close" 
        aria-label="Close" 
        onClick={handleGoBack}
        style={{ position: 'absolute', top: '60px', left: '50px', fontSize:'30px'}} // Simgenin konumunu ayarlıyoruz
      ></button>

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
            <input type="text" className="form-control" name="name" required />
          </div>
          <div className="form-group col-md-2 ps-3">
            <label htmlFor="inputRating">Rating</label>
            <input type="text" className="form-control" name="rating" required />
          </div>
        </div>
        
        {/* Kategori Seçimi */}
        <div className="form-group">
          <label htmlFor="inputCategory">Category</label>
          <select className="form-control" name="category" required>
            <option value="">Select Category</option>
            <option value="Heyecan">Heyecan</option>
            <option value="Gerilim">Gerilim</option>
            <option value="Korku">Korku</option>
          </select>
        </div>

        <ImageUpload onImageUpload={handleImageUpload} />
        
        <div className="form-row">
          <div className="form-group col-md-12">
            <label htmlFor="overviewTextarea">Overview</label>
            <textarea
              className="form-control"
              name="overview"
              rows="5"
              required
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
