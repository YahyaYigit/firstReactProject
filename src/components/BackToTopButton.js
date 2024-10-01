import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) { // 300px aşağı kaydırıldığında butonu göster
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Yumuşak kaydırma efekti
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button
      className={`btn btn-danger back-to-top ${isVisible ? 'visible' : 'hidden'}`}
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '50px', // Butonun genişliği
        height: '50px', // Butonun yüksekliği
        borderRadius: '50%', // Yuvarlak hale getirme
        alignItems: 'center',
        justifyContent: 'center',
        display: isVisible ? 'block' : 'none', // Butonu yalnızca görünür olduğunda göster
      }}
    >
      {/* Burada metni kaldırdık */}
      <i className="bi bi-arrow-up"></i> {/* Yukarı ok simgesi */}
    </button>
  );
};

export default BackToTopButton;
