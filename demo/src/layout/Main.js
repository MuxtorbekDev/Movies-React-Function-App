import React, { useState, useEffect } from "react";
import Movies from "../companents/Movies";
import Loading from "../companents/Loading";
import Search from "../companents/Search";

export default function Main() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchMovies = (str, type = "all") => {
    setLoading(true);
    fetch(
      `http://www.omdbapi.com/?apikey=52d4c6e2&s=${str}${
        type !== "all" ? `&type=${type}` : ""
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.Search);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetch("http://www.omdbapi.com/?apikey=52d4c6e2&s=panda")
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.Search);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container content">
      <div className="search">
        <Search searchMovies={searchMovies} />
      </div>
      <div>{loading ? <Loading /> : <Movies movies={movies} />}</div>
    </div>
  );
}
