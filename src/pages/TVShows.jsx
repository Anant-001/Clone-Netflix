import React from "react";
import MovieRow from "../components/MovieRow";

const TVShows = () => (
    <div className="pt-20">
        <h2 className="text-white text-2xl font-bold px-6 mb-4">TV Shows</h2>
        <MovieRow title="Popular TV" endpoint="/tv/popular" />
        <MovieRow title="Top Rated TV" endpoint="/tv/top_rated" />
        <MovieRow title="Sci-Fi & Fantasy" endpoint="/discover/tv?with_genres=10765" />
    </div>
);

export default TVShows;
