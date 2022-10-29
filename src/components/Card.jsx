import React, { useEffect, useState } from "react";

const IMG_API = "https://image.tmdb.org/t/p/w1280";

const setVoteClass = (vote) => {
  if (vote >= 7.5) {
    return "green";
  } else if (vote >= 6) {
    return "orange";
  } else {
    return "red";
  }
};
const Card = ({
  title,
  poster_path,
  overview,
  id,
  vote_average,
  type,
  name,
}) => {
  const handleClick = () => {
    fetch(
      `https://api.themoviedb.org/3/${type}/${id}/external_ids?api_key=${
        import.meta.env.VITE_TMDB_KEY
      }&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        window.open(
          `https://www.imdb.com/title/${data.imdb_id}`,
          "_blank",
          "noopener,noreferrer"
        );
      });
  };
  return (
    <div onClick={handleClick}>
      <div className="movie">
        <img src={IMG_API + poster_path} alt={title} />
        <div className="movie-info">
          <h3>{title ? title : name}</h3>
          <span className={`tag ${setVoteClass(vote_average)}`}>
            {vote_average}
          </span>
        </div>
        <div className="movie-over">
          <h2 className="overview">Overview:</h2>
          <p>{overview}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
