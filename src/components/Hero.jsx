import React, { useEffect, useState } from "react";
import { FaPlay, FaInfoCircle } from "react-icons/fa";
import Modal from "./Modal"; // create this component

const Hero = () => {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const fetchFeaturedMovie = async () => {
        try {
            const apiKey = import.meta.env.VITE_TMDB_API_KEY;
            // Using popular movies instead of trending
            const url = `https://api.themoviedb.org/3/movie/popular?language=en-US`;

            const res = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
            const data = await res.json();
            const randomIndex = Math.floor(Math.random() * data.results.length);
            setMovie(data.results[randomIndex]);
        } catch (error) {
            console.error("Error fetching featured movie:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFeaturedMovie();
    }, []);

    if (loading || !movie) {
        return (
            <section className="relative h-[90vh] bg-black flex items-center justify-center">
                <p className="text-gray-400 animate-pulse">Loading featured content...</p>
            </section>
        );
    }

    const backdropPath = movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : "/banner.jpg";

    return (
        <>
            <section
                className="relative h-[90vh] w-full bg-cover bg-center transition-all duration-700"
                style={{ backgroundImage: `url(${backdropPath})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>

                <div className="relative z-10 max-w-4xl px-6 md:px-12 lg:px-16 py-20 md:py-32 text-white">
                    <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">
                        {movie.title || movie.name}
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-xl line-clamp-4">
                        {movie.overview?.substring(0, 200)}
                        {movie.overview?.length > 200 ? "..." : ""}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-4">
                        <button className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded-full text-lg font-medium hover:bg-gray-200 transition-all">
                            <FaPlay />
                            Play
                        </button>
                        <button
                            className="flex items-center gap-2 bg-white/20 text-white border border-white/30 px-6 py-2 rounded-full text-lg font-medium hover:bg-white/30 transition-all"
                            onClick={() => setShowModal(true)}
                        >
                            <FaInfoCircle />
                            More Info
                        </button>
                    </div>
                </div>
            </section>

            {showModal && (
                <Modal movie={movie} onClose={() => setShowModal(false)} />
            )}
        </>
    );
};

export default Hero;
