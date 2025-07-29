import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { updateSearchCount } from "../appwrite";

const SearchResults = ({ query }) => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [debouncedQuery, setDebouncedQuery] = useState(query);

    // Debounce the input query (300ms delay)
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 300);

        return () => clearTimeout(handler);
    }, [query]);

    // Fetch movies based on debounced query
    useEffect(() => {
        const fetchResults = async () => {
            if (!debouncedQuery) return;

            setLoading(true);
            try {
                const apiKey = import.meta.env.VITE_TMDB_API_KEY;
                const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(debouncedQuery)}&language=en-US`;

                const res = await fetch(url, {
                    headers: {
                        'Authorization': `Bearer ${apiKey}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }

                const data = await res.json();
                setResults(data.results || []);
            } catch (error) {
                console.error("Error searching movies:", error);
                setResults([]);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [debouncedQuery]);

    return (
        <div className="mt-24 px-8 py-4">
            <h2 className="text-2xl font-bold mb-4">
                Search Results for: <span className="text-red-400">{debouncedQuery}</span>
            </h2>

            {loading ? (
                <p className="text-gray-400">Loading...</p>
            ) : results.length === 0 ? (
                <p className="text-gray-400">No results found.</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {results.map((movie) => (
                        <div
                            key={movie.id}
                            className="relative group cursor-pointer"
                            onClick={() => {
                                setSelectedMovie(movie);
                                updateSearchCount(debouncedQuery, movie);
                            }}
                        >
                            <img
                                src={
                                    movie.poster_path
                                        ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                                        : "/no-movie.png"
                                }
                                alt={movie.title}
                                className="w-full h-auto rounded shadow hover:scale-105 transition-transform"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-sm px-2 py-1">
                                {movie.title}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal for More Info */}
            <Modal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
        </div>
    );
};

export default SearchResults;
