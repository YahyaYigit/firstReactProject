// ImageUpload.js
import React, { useState } from 'react';

const ImageUpload = ({ onImageUpload }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Yüklenen resmin verisini state'e kaydet
        onImageUpload(reader.result); // Yüklenen resmi üst bileşene gönder
      };
      reader.readAsDataURL(file); // Resmi base64 formatında oku
    }
  };

  return (
    <div className="mb-4">
      <label
        className="btn btn-danger" 
        style={{
          marginTop: '25px', 
        }}
      >
        Eklemek İstediğiniz Resmi Seçiniz
        <input
          type="file"
          onChange={handleImageChange}
          style={{ display: 'none' }} // Varsayılan dosya girişi gizli
        />
      </label>
      {image && (
        <div>
          <h3>Yüklenen Resim:</h3>
          <img src={image} alt="Yüklenen Resim" style={{ width: '200px', height: 'auto' }} />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
