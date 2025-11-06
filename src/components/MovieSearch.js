import React, { useState, useEffect } from "react";
import axios from "axios";

function MovieSearch() {
  const [query, setQuery] = useState(localStorage.getItem("lastQuery") || "");
  const [movies, setMovies] = useState(
    JSON.parse(localStorage.getItem("movieResults")) || []
  );

  const apiKey = process.env.REACT_APP_TMDB_API_KEY;

  useEffect(() => {
    if (query) {
      searchMovies(query);
    }
  }, []);

  const searchMovies = async (searchTerm) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`
      );
      setMovies(response.data.results);
      localStorage.setItem("movieResults", JSON.stringify(response.data.results));
      localStorage.setItem("lastQuery", searchTerm);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchMovies(query);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Search Movies</h2>
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          placeholder="Enter movie title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-3 py-2 rounded">
          Search
        </button>
      </form>

      {movies.length > 0 ? (
        <ul className="space-y-2">
          {movies.map((movie) => (
            <li key={movie.id} className="border p-3 rounded shadow">
              <h3 className="font-bold">{movie.title}</h3>
              <p>{movie.overview}</p>
              <p><strong>Release:</strong> {movie.release_date}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results yet — try searching for a movie!</p>
      )}
    </div>
  );
}

export default MovieSearch;
