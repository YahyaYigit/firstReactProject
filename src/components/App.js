import React, { useEffect, useState } from "react";
import MovieList from "./MovieList";
import SearchBar from "./SearchBar";
import axios from "axios";
import AddMovie from "./AddMovie";
import UpdateMovie from "./UpdateMovie";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import BackToTopButton from "./BackToTopButton";
import FaqCom from "./FaqCom";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get("http://localhost:3002/movies");
      const sortedMovies = response.data.sort((a, b) => b.id - a.id); // Filmleri ters sıraya göre sıralıyoruz
      setMovies(sortedMovies);
    };

    fetchMovies();
  }, []);

  const deleteMovie = async (movie) => {
    await axios.delete(`http://localhost:3002/movies/${movie.id}`);
    const newMovieList = movies.filter((m) => m.id !== movie.id);
    setMovies(newMovieList);
  };

  // Filmleri listeye güncelleme fonksiyonu
  const updateMovieInList = (updatedMovie) => {
    setMovies((prevMovies) => {
      const updatedMovies = prevMovies.map((movie) =>
        movie.id === updatedMovie.id ? updatedMovie : movie
      );
      return updatedMovies.sort((a, b) => b.id - a.id); // Güncellenmiş listeyi ters id'ye göre sıralıyoruz
    });
  };

  const addMovie = async (movie) => {
    await axios.post(`http://localhost:3002/movies/`, movie);
    const newMovieList = [...movies, movie];
    setMovies(newMovieList.sort((a, b) => b.id - a.id)); // Film eklendikten sonra listeyi ters id'ye göre tekrar sıralıyoruz
  };

  const searchMovie = (event) => {
    setSearchQuery(event.target.value);
  };

  let filteredMovies = movies.filter((movie) => {
    return (
      movie.name &&
      movie.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
    );
  });

  return (
    <div className="container">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <React.Fragment>
                <div className="row">
                  <div className="col-lg-12">
                    <SearchBar searchMovieProp={searchMovie} />
                  </div>
                </div>
                <MovieList
                  movies={filteredMovies}
                  deleteMovieProp={deleteMovie}
                  updateMovieProp={updateMovieInList} // Güncellenen filmi listeye ekle
                />
                <FaqCom />
                <BackToTopButton />
              </React.Fragment>
            }
          />
          <Route
            path="/add"
            element={<AddMovie onAddMovie={addMovie} />}
          />
          <Route
            path="/edit/:id"
            element={
              <UpdateMovie onUpdateMovie={updateMovieInList} /> // Güncellenen filmi bu fonksiyonla güncelle
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
