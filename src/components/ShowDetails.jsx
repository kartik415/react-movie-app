import { useParams } from "react-router-dom";
import { useEffect, useState, Fragment } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import Card from "./Card";
const IMG_API = "https://image.tmdb.org/t/p/w1280";

const SHOW_DETAILS = `https://api.themoviedb.org/3/tv/`;

const ShowDetails = () => {
  const { id } = useParams();
  const [showDetail, setShowDetail] = useState();
  const [seasonDetail, setSeasonDetail] = useState();
  const [similarSeries, setSimilarSeries] = useState();

  useEffect(() => {
    fetch(
      `${SHOW_DETAILS}/${id}?api_key=${
        import.meta.env.VITE_TMDB_KEY
      }&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        setShowDetail(data);
      });
    fetch(
      `${SHOW_DETAILS}/${id}/similar?api_key=${
        import.meta.env.VITE_TMDB_KEY
      }&language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((data) => {
        setSimilarSeries(data.results);
      });
  }, [id]);

  const handleClick = (season_id) => {
    fetch(
      `${SHOW_DETAILS}/${id}/season/${season_id}?api_key=${
        import.meta.env.VITE_TMDB_KEY
      }&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        setSeasonDetail(data);
      });
  };
  return (
    <div className="max-w-screen-xl md:mx-auto">
      <div className="flex flex-col justify-start items-start m-4 md:my-8 md:mx-4">
        <h1 className="text-4xl underline decoration-[8px] underline-offset-1 decoration-primary">
          {showDetail?.name}
        </h1>
        <div className="flex flex-col md:flex-row gap-6 w-full mt-12">
          <img
            className="md:w-1/4 h-auto rounded-xl"
            src={IMG_API + showDetail?.poster_path}
            alt={showDetail?.name}
          />
          <div className="md:w-2/4 flex flex-col gap-4 justify-center">
            <p>First Aired date: {showDetail?.first_air_date}</p>
            <p>Last Aired date: {showDetail?.last_air_date}</p>
            <p>Status: {showDetail?.status}</p>
            <p>Number of Episodes: {showDetail?.number_of_episodes}</p>
            <p>Number of Seasons: {showDetail?.number_of_seasons}</p>
            <p>{showDetail?.overview}</p>
            <p>
              Genre:{" "}
              {showDetail?.genres
                ?.map((genre) => {
                  return genre.name;
                })
                .join(" ,")}
            </p>
          </div>
        </div>

        <div className="mt-6 md:m-4 md:my-8 md:mx-0 w-full rounded-2xl flex flex-col gap-6">
          {showDetail?.seasons?.map((season) => (
            <>
              {season?.air_date ? (
                <div
                  key={season.id}
                  className="w-full bg-gray-800 rounded-xl p-6 flex flex-col gap-6 md:flex-row md:gap-8"
                >
                  <img
                    src={IMG_API + season?.poster_path}
                    className="md:h-48 rounded-md md:w-auto"
                  ></img>
                  <div className="flex flex-col gap-2 pt-6">
                    <p>Name: {season?.name}</p>
                    <p>Aired Date: {season?.air_date}</p>
                    <p>No.of Episodes: {season?.episode_count}</p>
                    <p>{season?.overview}</p>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </>
          ))}
        </div>

        {/* <div className="m-4 md:my-8 md:mx-0 w-full rounded-2xl flex flex-col gap-6">
          {showDetail?.seasons?.map((season) => (
            <Disclosure as="div" key={season?.id}>
              {({ open }) => (
                <div onClick={() => handleClick(season?.season_number)}>
                  <Disclosure.Button className="flex w-full justify-between rounded-lg bg-red-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                    <span>{season.name}</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-purple-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                    {seasonDetail?.episodes.length ? (
                      <>
                        {seasonDetail?.episodes?.map((episode) => (
                          <div
                            key={episode?.id}
                            className="flex flex-col text-white"
                          >
                            {episode.name}
                          </div>
                        ))}
                      </>
                    ) : (
                      <div>To be released</div>
                    )}
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>
          ))}
        </div> */}
      </div>
      <div className="m-4 md:my-8 md:mx-4">
        <h1 className="text-3xl mt-6">More Like This</h1>
        <div className="scroll-container">
          {similarSeries?.length > 0 &&
            similarSeries?.map((series) => (
              <Card key={series.id} type="tv" {...series} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;
