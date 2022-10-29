import React from "react";
import Card from "./Card";
import { useState, useEffect } from "react";

const PLAYING_MOVIE = `https://api.themoviedb.org/3/movie/now_playing?api_key=${
  import.meta.env.VITE_TMDB_KEY
}&language=en-US&page=1`;

const UPCOMING_MOVIE = `https://api.themoviedb.org/3/movie/upcoming?api_key=${
  import.meta.env.VITE_TMDB_KEY
}&language=en-US&page=1`;

const AIRINGTODAY_TV = `https://api.themoviedb.org/3/tv/airing_today?api_key=${
  import.meta.env.VITE_TMDB_KEY
}&language=en-US&page=1`;

const ONAIR_TV = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${
  import.meta.env.VITE_TMDB_KEY
}&language=en-US&page=1`;

const Home = () => {
  const [playingMovies, setPlayingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [airingtodayTV, setAiringtodayTV] = useState([]);
  const [onairTV, setOnairTV] = useState([]);

  useEffect(() => {
    fetch(PLAYING_MOVIE)
      .then((res) => res.json())
      .then((data) => {
        setPlayingMovies(data.results);
      });
  }, []);
  useEffect(() => {
    fetch(UPCOMING_MOVIE)
      .then((res) => res.json())
      .then((data) => {
        setUpcomingMovies(data.results);
      });
  }, []);
  useEffect(() => {
    fetch(AIRINGTODAY_TV)
      .then((res) => res.json())
      .then((data) => {
        setAiringtodayTV(data.results);
      });
  }, []);
  useEffect(() => {
    fetch(ONAIR_TV)
      .then((res) => res.json())
      .then((data) => {
        setOnairTV(data.results);
      });
  }, []);

  return (
    <>
      <div className="wrapper">
        <h1 style={{ margin: "1rem" }}>Now Playing Movies</h1>
        <div className="scroll-container">
          {playingMovies.length > 0 &&
            playingMovies.map((movie) => (
              <Card key={movie.id} type="movie" {...movie} />
            ))}
        </div>
        <h1 style={{ margin: "1rem", marginTop: "2rem" }}>Upcoming Movies</h1>
        <div className="scroll-container">
          {upcomingMovies.length > 0 &&
            upcomingMovies.map((movie) => (
              <Card key={movie.id} type="movie" {...movie} />
            ))}
        </div>
        <h1 style={{ margin: "1rem", marginTop: "2rem" }}>
          TV Shows Airing Today
        </h1>
        <div className="scroll-container">
          {airingtodayTV.length > 0 &&
            airingtodayTV.map((movie) => (
              <Card key={movie.id} type="tv" {...movie} />
            ))}
        </div>
        <h1 style={{ margin: "1rem", marginTop: "2rem" }}>TV Shows on Air</h1>
        <div className="scroll-container">
          {onairTV.length > 0 &&
            onairTV.map((movie) => (
              <Card key={movie.id} type="tv" {...movie} />
            ))}
        </div>
      </div>
    </>
  );
};
export default Home;
