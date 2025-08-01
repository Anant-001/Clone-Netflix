import React, { useEffect, useState } from "react";

const MovieRow = ({ title, endpoint }) => {
    const [movies, setMovies] = useState([]);

    const fetchMovies = async () => {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const baseUrl = `https://api.themoviedb.org/3${endpoint}`;
        const url = endpoint.includes('?')
            ? `${baseUrl}&language=en-US`
            : `${baseUrl}?language=en-US`;

        try {
            const res = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const data = await res.json();
            setMovies(data.results || []);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <div className="px-8 my-12 text-white">
            <h2 className="text-2xl font-semibold mb-4">{title}</h2>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
                {movies.map((movie) => (
                    <div
                        key={movie.id}
                        className="w-[180px] flex-shrink-0 bg-gray-800/70 rounded-lg shadow hover:shadow-xl transition-transform duration-300 transform hover:scale-105"
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                            alt={movie.title || movie.name}
                            className="w-full h-[260px] object-cover rounded-t-lg"
                        />
                        <div className="p-3">
                            <h3 className="text-sm font-bold truncate">
                                {movie.title || movie.name}
                            </h3>

                            {/* ⭐ Rating */}
                            {movie.vote_average && (
                                <p className="text-xs text-yellow-400 mt-1">
                                    ⭐ {movie.vote_average.toFixed(1)} / 10
                                </p>
                            )}

                            {/* 📝 Overview */}
                            {movie.overview && (
                                <p className="text-xs text-gray-300 mt-1 line-clamp-3">
                                    {movie.overview.slice(0, 100)}
                                    {movie.overview.length > 100 ? "..." : ""}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieRow;
