import React, { useEffect, useState } from "react";
import { getTrendingMovies } from "../appwrite";

const TrendingMovies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTrendingMovies = async () => {
            try {
                const trendingMovies = await getTrendingMovies();
                setMovies(trendingMovies || []);
            } catch (error) {
                console.error(`Error fetching trending movies: ${error}`);
            } finally {
                setLoading(false);
            }
        };

        loadTrendingMovies();
    }, []);

    return (
        <section className="px-6 md:px-12 my-12 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
                🔥 Trending Now
            </h2>

            {loading ? (
                <div className="flex gap-4 overflow-x-auto scrollbar-hide">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="w-[160px] h-[240px] bg-gray-800/50 animate-pulse rounded-lg"
                        />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                    {movies.map((movie) => (
                        <div
                            key={movie.$id}
                            className="relative group cursor-pointer transform hover:scale-105 transition-transform duration-300"
                        >
                            <img
                                src={movie.poster_url || "/no-movie.png"}
                                alt={movie.title || movie.name}
                                className="w-full h-[240px] object-cover rounded-lg shadow-lg"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-end p-3">
                                <p className="text-sm font-medium text-white truncate">
                                    {movie.title || movie.name}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default TrendingMovies;
