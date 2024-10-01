import React, { useEffect, useState } from "react";
import MovieList from "./MovieList";
import SearchBar from "./SearchBar";
import axios from "axios";
import AddMovie from "./AddMovie";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import BackToTopButton from "./BackToTopButton";





function App() {


  const [movies,setMovies]=useState([]);
  const [searchQuery,setSearchQuery]=useState("");

  


  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get("http://localhost:3002/movies");
      console.log(response);
      setMovies(response.data);
    };

    

    fetchMovies();
  }, []);
  

  const deleteMovie = async (movie) => {
    await axios.delete(`http://localhost:3002/movies/${movie.id}`);
    const newMovieList = movies.filter((m) => m.id !== movie.id);
    setMovies(newMovieList);
  };

  const categories = ["heyecan", "gerilim", "korku"];




  const searchMovie = (event) => {
    setSearchQuery(event.target.value);
  };

  const addMovie = async (movie) => {
    await axios.post(`http://localhost:3002/movies/`, movie);
    setMovies((prevMovies) => [...prevMovies, movie])
  };

  let filteredMovies = movies.filter((movie) => {
    return (
      movie.name &&
      movie.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !==
        -1
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
                    categories={categories} // Kategorileri geçir
                    deleteMovieProp={deleteMovie}
                />
                <BackToTopButton />
              </React.Fragment>
            }
          />
          <Route
            path="/add"
            element={
              <AddMovie
                onAddMovie={(movie) => {
                addMovie(movie);
                  <useNavigate to="/" replace={true} />; 
                }}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
