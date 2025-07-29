import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-hot-toast"; // 👈 import toast
import {
    addToMyList,
    removeFromMyList,
    isInMyList,
} from "../utils/myList";

const Modal = ({ movie, onClose }) => {
    const [videoKey, setVideoKey] = useState(null);
    const [inList, setInList] = useState(false);

    useEffect(() => {
        const fetchTrailer = async () => {
            if (!movie) return;
            try {
                const apiKey = import.meta.env.VITE_TMDB_API_KEY;
                const type = movie.media_type || "movie";
                const url = `https://api.themoviedb.org/3/${type}/${movie.id}/videos`;

                const res = await fetch(url, {
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                        "Content-Type": "application/json",
                    },
                });

                const data = await res.json();
                const trailer = data.results.find(
                    (vid) => vid.type === "Trailer" && vid.site === "YouTube"
                );
                if (trailer) setVideoKey(trailer.key);
            } catch (err) {
                console.error("Trailer fetch failed:", err);
            }
        };

        fetchTrailer();
    }, [movie]);

    useEffect(() => {
        if (movie) {
            setInList(isInMyList(movie.id));
        }
    }, [movie]);

    if (!movie) return null;

    const handleToggleList = () => {
        if (inList) {
            removeFromMyList(movie.id);
            toast.error("Removed from My List");
        } else {
            addToMyList(movie);
            toast.success("Added to My List");
        }
        setInList(!inList);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="relative bg-gray-900 text-white w-full max-w-3xl p-6 rounded-lg shadow-lg">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-xl hover:text-red-400"
                >
                    <FaTimes />
                </button>

                <h2 className="text-2xl font-bold mb-4">
                    {movie.title || movie.name}
                </h2>

                {videoKey ? (
                    <div className="aspect-video mb-4">
                        <iframe
                            className="w-full h-full rounded"
                            src={`https://www.youtube.com/embed/${videoKey}`}
                            frameBorder="0"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            title="Trailer"
                        ></iframe>
                    </div>
                ) : (
                    <p className="text-gray-400 mb-4">Trailer not available.</p>
                )}

                <p className="text-gray-300 mb-4">{movie.overview}</p>

                <button
                    onClick={handleToggleList}
                    className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition"
                >
                    {inList ? "Remove from My List" : "Add to My List"}
                </button>
            </div>
        </div>
    );
};

export default Modal;
