import React from "react";
import Card from "./Card";
import { useState, useEffect } from "react";

const TOPRATED_TV = `https://api.themoviedb.org/3/tv/top_rated?api_key=${
  import.meta.env.VITE_TMDB_KEY
}&language=en-US&page=1`;

const SEARCH_API = `https://api.themoviedb.org/3/search/tv?api_key=${
  import.meta.env.VITE_TMDB_KEY
}&query=`;

const Tv = () => {
  const [topratedTv, setTopratedTv] = useState([]);
  const [searchTerm, setsearchTerm] = useState([]);

  useEffect(() => {
    fetch(TOPRATED_TV)
      .then((res) => res.json())
      .then((data) => {
        setTopratedTv(data.results);
      });
  }, []);
  const handleOnSubmit = (e) => {
    e.preventDefault();

    fetch(SEARCH_API + searchTerm)
      .then((res) => res.json())
      .then((data) => {
        setTopratedTv(data.results);
      });
  };

  const handleOnChange = (e) => {
    setsearchTerm(e.target.value);
  };
  return (
    <>
      <form className="formWrapper" onSubmit={handleOnSubmit}>
        <input
          type="search"
          onChange={handleOnChange}
          value={searchTerm}
          className="search"
          placeholder="Search...."
        />
      </form>
      <div className="movie-container">
        {topratedTv.length > 0 &&
          topratedTv.map((movie) => (
            <Card key={movie.id} {...movie} type="tv" />
          ))}
      </div>
    </>
  );
};

export default Tv;
