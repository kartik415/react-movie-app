import { useState, useEffect } from 'react'

import './App.css'
import Movie from './components/Movies';

const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?api_key=a04e1efd5efc6859b6f6f38348ad0164&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=";


const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=a04e1efd5efc6859b6f6f38348ad0164&query=";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setsearchTerm] = useState([]);

  useEffect(()=> {
    fetch(FEATURED_API)
      .then((res)=>res.json())
      .then((data)=>{
        console.log(data);
        setMovies(data.results);
    });
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    fetch(SEARCH_API+searchTerm)
      .then((res)=>res.json())
      .then((data)=>{
        setMovies(data.results);
  });
};

  const handleOnChange = (e) => {
    setsearchTerm(e.target.value);
  }

  return (
    <><header>
      <form onSubmit={handleOnSubmit}>
        <input type="search"  
          onChange={handleOnChange} 
          value={searchTerm} 
          className='search' 
          placeholder='Search....' 
          />

      </form>
      
    </header><div className='movie-container'>

        {movies.length > 0 &&
          movies.map((movie) => <Movie key={movie.id} {...movie} />
          )}
      </div></>
  )
};

export default App;
