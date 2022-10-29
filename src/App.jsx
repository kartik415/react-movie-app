import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Movies from "./components/Movies";
import Tv from "./components/Tv";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shows" element={<Tv />} />
        <Route path="/movies" element={<Movies />} />
      </Routes>
      {/* <header>
       
      </header> */}
    </>
  );
}

export default App;
