import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieList from "./MovieList";
import SearchBar from "./SearchBar";
import AddMovie from "./AddMovie";
import UpdateMovie from "./UpdateMovie";
import BackToTopButton from "./BackToTopButton";
import FaqCom from "./FaqCom";
import Footer from "./Footer";
import NavBar from "./Navbar";
import About from "./About";
import Contact from "./Contact";
import CartPage from "./CartPage";
import "./SideBar.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [showAddToCartMessage, setShowAddToCartMessage] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);

    const fetchMovies = async () => {
      const response = await axios.get("https://localhost:7070/api/Film");
      if (response) {
        const sortedMovies = response?.data?.data.sort(
          (a, b) => b.rating - a.rating
        );
        setMovies(sortedMovies);
        setFilteredMovies(sortedMovies);
      }
    };
    fetchMovies();

    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const searchMovie = (event) => {
    setSearchQuery(event.target.value);
    filterMovies(event.target.value, selectedCategory);
  };

  const filterMovies = (searchQuery, categoryId) => {
    const filtered = movies.filter((movie) => {
      const matchesCategory = categoryId
        ? movie.categoryId.toString() === categoryId
        : true;
      const matchesSearch = movie.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredMovies(filtered);
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    filterMovies(searchQuery, categoryId);
    setIsMenuOpen(false);
  };

  const deleteMovie = async (movie) => {
    try {
      await axios.delete(
        `https://localhost:7070/api/Film/DeleteFilm/${movie.id}`
      );
      const newMovieList = movies.filter((m) => m.id !== movie.id);
      setMovies(newMovieList);
      setFilteredMovies(newMovieList);
    } catch (error) {
      console.error("Silme işlemi sırasında hata:", error);
    }
  };

  const updateMovieInList = (updatedMovie) => {
    setMovies((prevMovies) => {
      const updatedMovies = prevMovies.map((movie) =>
        movie.id === updatedMovie.id ? updatedMovie : movie
      );
      return updatedMovies.sort((a, b) => b.rating - a.rating);
    });
    setFilteredMovies((prevFilteredMovies) => {
      const updatedMovies = prevFilteredMovies.map((movie) =>
        movie.id === updatedMovie.id ? updatedMovie : movie
      );
      return updatedMovies.sort((a, b) => b.rating - a.rating);
    });
  };

  const addMovie = async (movie) => {
    const newMovieList = [...movies, movie];
    setMovies(newMovieList.sort((a, b) => b.rating - a.rating));
    setFilteredMovies(newMovieList.sort((a, b) => b.rating - a.rating));
  };

  const addToCart = (movie) => {
    const isProductInCart = cart.some((item) => item.id === movie.id);
  
    if (isProductInCart) {
      alert("Bu ürün zaten sepete eklendi.");
    } else {
      setCart((prevCart) => [...prevCart, movie]);
      setShowAddToCartMessage(true);
  
      setTimeout(() => {
        setShowAddToCartMessage(false);
      }, 2000);
    }
  };

  const removeFromCart = (movieId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== movieId));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.setItem("cart", JSON.stringify([])); 
  };

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <div className="App">
      <Router>
        <NavBar toggleMenu={toggleMenu} cartLength={cart.length} />
        {showAddToCartMessage && (
          <>
            <div className="overlay"></div>
            <div className="add-to-cart-message">
              Sepete başarılı bir şekilde eklendi!
            </div>
          </>
        )}

        <Routes>
          <Route
            path="/"
            element={
              <>
                <button
                  ref={buttonRef}
                  onClick={toggleMenu}
                  className={`hamburger-btn ${isMenuOpen ? "open" : ""}`}
                >
                  ☰
                </button>

                <div
                  ref={menuRef}
                  className={`side-menu ${isMenuOpen ? "open" : ""}`}
                >
                  <h3>Kategoriler</h3>
                  <ul>
                    <li>
                      <button
                        className="btn fs-4"
                        onClick={() => handleCategoryClick("")}
                      >
                        Ana Sayfa
                      </button>
                    </li>
                    <li>
                      <button
                        className="btn fs-4"
                        onClick={() => handleCategoryClick("1")}
                      >
                        Savaş
                      </button>
                    </li>
                    <li>
                      <button
                        className="btn fs-4"
                        onClick={() => handleCategoryClick("2")}
                      >
                        Aksiyon
                      </button>
                    </li>
                    <li>
                      <button
                        className="btn fs-4"
                        onClick={() => handleCategoryClick("3")}
                      >
                        Korku
                      </button>
                    </li>
                    <li>
                      <button
                        className="btn fs-4"
                        onClick={() => handleCategoryClick("4")}
                      >
                        Gerilim
                      </button>
                    </li>
                    <li>
                      <button
                        className="btn fs-4"
                        onClick={() => handleCategoryClick("5")}
                      >
                        Komedi
                      </button>
                      <li>
                      <button
                        className="btn fs-4"
                        onClick={() => handleCategoryClick("6")}
                      >
                        Çizgi Film
                      </button>
                    </li>
                    </li>
                  </ul>
                </div>
              </>
            }
          />
        </Routes>

        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SearchBar searchMovieProp={searchMovie} />
                  {filteredMovies.length === 0 ? (
                    <div className="alert alert-warning" role="alert">
                      Film bulunamadı.
                    </div>
                  ) : (
                    <MovieList
                      movies={filteredMovies}
                      deleteMovieProp={deleteMovie}
                      updateMovieProp={updateMovieInList}
                      addToCart={addToCart}
                    />
                  )}
                  <FaqCom />
                  <BackToTopButton />
                </>
              }
            />
            <Route path="/add" element={<AddMovie onAddMovie={addMovie} />} />
            <Route
              path="/edit/:id"
              element={<UpdateMovie onUpdateMovie={updateMovieInList} />}
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/cart"
              element={<CartPage cartItems={cart} removeFromCart={removeFromCart} clearCart={clearCart} />}
            />
          </Routes>
        </div>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
