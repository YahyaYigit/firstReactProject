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
} from "react-router-dom";
import BackToTopButton from "./BackToTopButton";
import FaqCom from "./FaqCom";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState(1); // Aktif sayfa durumunu eklendi

  // Filmleri API'den çek
  // useEffect(() => {
  //   const fetchMovies = async () => {
  //     const response = await axios.get("http://localhost:3002/movies");
  //     const sortedMovies = response.data.sort((a, b) => b.id - a.id); // Filmleri ters sıraya göre sıralama
  //     setMovies(sortedMovies);
  //   };

  //   fetchMovies();
  // }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get("https://localhost:7070/api/Film");
      if(response){
        const sortedMovies =response?.data?.data.sort((a, b) => b.rating - a.rating); // Filmleri ters sıraya göre sıralama
        setMovies(sortedMovies)
      }
    };

    fetchMovies();
  }, []);

  // Arama sorgusu güncelleniyor
  const searchMovie = (event) => {
    setSearchQuery(event.target.value);
    setActivePage(1); // Arama yapıldığında aktif sayfayı 1 olarak sıfırlama
  };

  // Film silme
  const deleteMovie = async (movie) => {
    await axios.delete(`https://localhost:7070/api/Film/DeleteFilm${movie.id}`);
    const newMovieList = movies.filter((m) => m.rating !== movie.rating);
    setMovies(newMovieList);
  };

  // Film güncelleme
  const updateMovieInList = (updatedMovie) => {
    setMovies((prevMovies) => {
      const updatedMovies = prevMovies.map((movie) =>
        movie.id === updatedMovie.id ? updatedMovie : movie
      );
      return updatedMovies.sort((a, b) => b.id - a.id); // Güncellenmiş listeyi ters id'ye göre sıralama
    });
  };

  // Film ekleme
  const addMovie = async (movie) => {
    await axios.post(`https://localhost:7070/api/Film/CreateFilm`, movie);
    const newMovieList = [...movies, movie];
    setMovies(newMovieList.sort((a, b) => b.id - a.id)); // Film eklendikten sonra listeyi tekrar sıralama
  };

  // Arama sorgusuna göre filmleri filtrele
  const filteredMovies = movies.filter((movie) => {
    return (
      movie.name &&
      movie.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
    );
  });

  return (
    <div className="container">
      <Router>
        {/* Tüm sayfalarda arama çubuğunu göster */}
        <SearchBar searchMovieProp={searchMovie} resetPage={() => setActivePage(1)} />

        <Routes>
          <Route
            path="/"
            element={
              <React.Fragment>
                {filteredMovies.length === 0 ? (
                  <div className="alert alert-warning" role="alert">
                    Film bulunamadı.
                  </div>
                ) : (
                  <MovieList
                    movies={filteredMovies} // Filtrelenmiş filmleri gönder
                    deleteMovieProp={deleteMovie}  
                    updateMovieProp={updateMovieInList} 
                  />
                )}
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
              <UpdateMovie onUpdateMovie={updateMovieInList} /> 
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
