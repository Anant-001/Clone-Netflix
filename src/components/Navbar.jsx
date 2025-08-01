import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchResults from "./SearchResults";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-hot-toast";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
    const [query, setQuery] = useState("");
    const [showResults, setShowResults] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const mobileMenuRef = useRef(null);

    const user = auth.currentUser;

    const handleSearch = (e) => {
        setQuery(e.target.value);
        setShowResults(e.target.value.length > 1);
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast.success("Logged out");
            navigate("/login");
        } catch (err) {
            toast.error("Logout failed");
            console.error(err);
        }
    };

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };
    
    const toggleMobileMenu = () => {
        setMobileMenuOpen((prev) => !prev);
    };

    // Close dropdown and mobile menu if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
                setMobileMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const renderAvatar = () => {
        if (!user) return null;

        if (user.photoURL) {
            return (
                <img
                    src={user.photoURL}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full object-cover cursor-pointer"
                    onClick={toggleDropdown}
                />
            );
        }

        const fallback = user.displayName
            ? user.displayName.charAt(0).toUpperCase()
            : user.email.charAt(0).toUpperCase();

        return (
            <div
                className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center text-sm font-bold cursor-pointer"
                onClick={toggleDropdown}
            >
                {fallback}
            </div>
        );
    };

    return (
        <>
            <nav className="flex justify-between items-center px-4 sm:px-8 py-4 bg-gradient-to-b from-black to-transparent fixed top-0 w-full z-50">
                {/* Logo */}
                <Link to="/">
                    <h1 className="text-xl sm:text-2xl font-bold text-red-600">NETFLIX</h1>
                </Link>

                {/* Navigation Links - Desktop */}
                <ul className="hidden md:flex gap-6 text-sm font-medium text-white">
                    <li><Link to="/tv" className="hover:text-red-500">TV Shows</Link></li>
                    <li><Link to="/movies" className="hover:text-red-500">Movies</Link></li>
                    <li><Link to="/latest" className="hover:text-red-500">Latest</Link></li>
                    <li><Link to="/my-list" className="hover:text-red-500">My List</Link></li>
                </ul>

                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden text-white p-1"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle mobile menu"
                >
                    {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>

                {/* Search + User - Desktop */}
                <div className="hidden md:flex items-center gap-4 relative" ref={dropdownRef}>
                    <input
                        type="text"
                        value={query}
                        onChange={handleSearch}
                        placeholder="Search..."
                        className="bg-white/10 px-3 py-1 rounded text-sm placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />

                    {/* Avatar */}
                    {user && renderAvatar()}

                    {/* Dropdown */}
                    {dropdownOpen && (
                        <div className="absolute right-0 top-12 bg-gray-900 border border-gray-700 rounded shadow-lg text-white w-44 z-50">
                            <div className="p-3 border-b border-gray-700">
                                <p className="text-sm font-semibold">{user.displayName || user.email}</p>
                            </div>
                            <ul className="text-sm">
                                <li>
                                    <Link
                                        to="/my-list"
                                        className="block px-4 py-2 hover:bg-gray-700"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        My List
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 hover:bg-gray-700"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div 
                    className="fixed top-16 left-0 right-0 bg-black/95 z-40 p-4 border-t border-gray-800"
                    ref={mobileMenuRef}
                >
                    <ul className="flex flex-col gap-4 text-white mb-6">
                        <li><Link to="/tv" className="block py-2 hover:text-red-500" onClick={() => setMobileMenuOpen(false)}>TV Shows</Link></li>
                        <li><Link to="/movies" className="block py-2 hover:text-red-500" onClick={() => setMobileMenuOpen(false)}>Movies</Link></li>
                        <li><Link to="/latest" className="block py-2 hover:text-red-500" onClick={() => setMobileMenuOpen(false)}>Latest</Link></li>
                        <li><Link to="/my-list" className="block py-2 hover:text-red-500" onClick={() => setMobileMenuOpen(false)}>My List</Link></li>
                    </ul>
                    
                    {/* Search - Mobile */}
                    <div className="relative">
                        <input
                            type="text"
                            value={query}
                            onChange={handleSearch}
                            placeholder="Search..."
                            className="w-full bg-white/10 px-3 py-2 rounded text-sm placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>
                    
                    {/* User Options - Mobile */}
                    {user && (
                        <div className="mt-4 p-3 bg-gray-900/50 rounded">
                            <div className="flex items-center gap-3 mb-2">
                                {renderAvatar()}
                                <p className="text-sm font-semibold text-white">{user.displayName || user.email}</p>
                            </div>
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setMobileMenuOpen(false);
                                }}
                                className="w-full text-left px-2 py-2 text-sm text-white hover:bg-gray-700 rounded"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            )}

            {showResults && <SearchResults query={query} />}
        </>
    );
};

export default Navbar;
