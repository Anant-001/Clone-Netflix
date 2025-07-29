import React from "react";
import MovieRow from "../components/MovieRow";

const Movies = () => (
    <div className="pt-20">
        <h2 className="text-white text-2xl font-bold px-6 mb-4">Movies</h2>
        <MovieRow title="Now Playing" endpoint="/movie/now_playing" />
        <MovieRow title="Upcoming" endpoint="/movie/upcoming" />
        <MovieRow title="Documentaries" endpoint="/discover/movie?with_genres=99" />
    </div>
);

export default Movies;