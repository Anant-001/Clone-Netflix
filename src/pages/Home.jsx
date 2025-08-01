import React from "react";
import Hero from "../components/Hero";
import MovieRow from "../components/MovieRow";
import TrendingMovies from "../components/TrendingMovies";

const Home = () => (
    <div>
            <Hero />
            <TrendingMovies />
            <MovieRow title="Top Rated" endpoint="/movie/top_rated" />
            <MovieRow title="Action Movies" endpoint="/discover/movie?with_genres=28" />
            <MovieRow title="Comedy Movies" endpoint="/discover/movie?with_genres=35" />
    </div>
);

export default Home;
