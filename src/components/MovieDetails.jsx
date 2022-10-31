import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "./Card";
const IMG_API = "https://image.tmdb.org/t/p/w1280";

const MOVIE_DETAILS = `https://api.themoviedb.org/3/movie/`;

const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState();
  const [similarMovies, setSimilarMovies] = useState();
  useEffect(() => {
    fetch(
      `${MOVIE_DETAILS}/${id}?api_key=${
        import.meta.env.VITE_TMDB_KEY
      }&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovieDetail(data);
      });
    fetch(
      `${MOVIE_DETAILS}/${id}/similar?api_key=${
        import.meta.env.VITE_TMDB_KEY
      }&language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((data) => {
        setSimilarMovies(data.results);
      });
  }, [id]);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className="max-w-screen-xl mx-4 md:mx-auto">
      <div className="flex flex-col justify-start items-start m-4 md:my-8 md:mx-4">
        <h1 className="text-4xl underline decoration-[8px] underline-offset-1 decoration-primary">
          {movieDetail?.title}
        </h1>
        <div className="flex flex-col md:flex-row gap-6 w-full mt-12">
          <img
            className="md:w-1/4 h-auto rounded-xl"
            src={IMG_API + movieDetail?.poster_path}
            alt={movieDetail?.title}
          />
          <div className="md:w-2/4 flex flex-col gap-4 justify-center">
            <p>Release Date: {movieDetail?.release_date}</p>
            <p>Status: {movieDetail?.status}</p>
            <p>Overview: {movieDetail?.overview}</p>
            <p>
              Genre:{" "}
              {movieDetail?.genres
                ?.map((genre) => {
                  return genre.name;
                })
                .join(" ,")}
            </p>
            <p>Revenue: {formatter.format(movieDetail?.revenue)}</p>
            <p>Budget: {formatter.format(movieDetail?.budget)}</p>
          </div>
        </div>
      </div>
      <div className="m-4 md:my-8 md:mx-4">
        <h1 className="text-3xl mt-6">More Like This</h1>
        <div className="scroll-container">
          {similarMovies?.length > 0 &&
            similarMovies?.map((movie) => (
              <Card key={movie.id} type="movie" {...movie} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
