import React from "react";
import MovieRow from "../components/MovieRow";

const Latest = () => (
    <div className="pt-20">
        <h2 className="text-white text-2xl font-bold px-6 mb-4">Latest Releases</h2>
        <MovieRow title="Latest Movies" endpoint="/movie/latest" />
        <MovieRow title="Latest TV Shows" endpoint="/tv/latest" />
    </div>
);

export default Latest;