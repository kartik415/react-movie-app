import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Movies from "./components/Movies";
import Tv from "./components/Tv";
import MovieDetails from "./components/MovieDetails";
import ShowDetails from "./components/ShowDetails";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shows" element={<Tv />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/tv/:id" element={<ShowDetails />} />
      </Routes>
      {/* <header></header>
       
      </header> */}
    </>
  );
}

export default App;
