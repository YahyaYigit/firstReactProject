import React, { useState, useEffect } from 'react';
import { IoIosArrowUp } from 'react-icons/io'; // react-icons'dan ok simgesi
import 'bootstrap/dist/css/bootstrap.min.css';
import './SideBar.css';

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
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
      className={`backbtn ${isVisible ? 'visible' : 'hidden'}`}
      onClick={scrollToTop}
      style={{
        display: isVisible ? 'block' : 'none',
      }}
    >
      <IoIosArrowUp size={30} /> {/* react-icons'dan ok simgesi */}
    </button>
  );
};

export default BackToTopButton;
