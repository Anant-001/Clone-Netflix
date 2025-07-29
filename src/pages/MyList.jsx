import React, { useEffect, useState } from "react";
import { getMyList, removeFromMyList } from "../utils/myList";
import toast from "react-hot-toast";

const MyList = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        setMovies(getMyList());
    }, []);

    const handleRemove = (movieId) => {
        removeFromMyList(movieId);
        const updatedList = getMyList();
        setMovies(updatedList);
        toast.success("Removed from My List");
    };

    return (
        <div className="px-4 sm:px-8 pt-24 pb-12 min-h-screen bg-black text-white">
            <h2 className="text-3xl font-bold mb-8 text-center md:text-left">📃 My List</h2>

            {movies.length === 0 ? (
                <div className="text-center text-gray-400 space-y-4">
                    <p className="text-lg">You haven’t added anything to your list yet.</p>
                    <img
                        src="/empty-list.svg" // Place a visual in public/ or replace with another
                        alt="Empty list"
                        className="w-40 mx-auto opacity-70"
                    />
                    <p className="text-sm">Browse and add movies to build your list!</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {movies.map((movie) => (
                        <div
                            key={movie.id}
                            className="relative group overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-[1.03]"
                        >
                            <img
                                src={movie.poster_url}
                                alt={movie.title}
                                className="w-full h-[240px] object-cover"
                            />
                            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-end p-4">
                                <h3 className="text-lg font-semibold line-clamp-2">{movie.title}</h3>
                                <button
                                    onClick={() => handleRemove(movie.id)}
                                    className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded text-sm font-medium"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyList;
