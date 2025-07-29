import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

// Components and Pages
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import TVShows from "./pages/TVShows";
import Movies from "./pages/Movies";
import Latest from "./pages/Latest";
import MyList from "./pages/MyList";
import Login from "./pages/Login";
import IntroScreen from "./pages/IntroScreen"; // ✅ Add this

const PrivateRoute = ({ user, children }) => {
    return user ? children : <Navigate to="/login" />;
};

const AppContent = ({ user }) => {
    const location = useLocation();
    const showNavbar = user && location.pathname !== "/intro";

    return (
        <div className="min-h-screen bg-black text-white">
            {/* 🔔 Toast notifications */}
            <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

            {/* 🧭 Navbar shown only when logged in and not on intro */}
            {showNavbar && <Navbar />}

            <main className={`${showNavbar ? "pt-20" : ""} px-4 sm:px-8`}>
                <Routes>
                    <Route path="/intro" element={<IntroScreen />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<PrivateRoute user={user}><Home /></PrivateRoute>} />
                    <Route path="/tv" element={<PrivateRoute user={user}><TVShows /></PrivateRoute>} />
                    <Route path="/movies" element={<PrivateRoute user={user}><Movies /></PrivateRoute>} />
                    <Route path="/latest" element={<PrivateRoute user={user}><Latest /></PrivateRoute>} />
                    <Route path="/my-list" element={<PrivateRoute user={user}><MyList /></PrivateRoute>} />
                    <Route path="*" element={<Navigate to="/intro" />} />
                </Routes>
            </main>

            {/* Footer shown only when logged in and not on intro */}
            {showNavbar && <Footer />}
        </div>
    );
};

const App = () => {
    const [user, setUser] = useState(null);
    const [introComplete, setIntroComplete] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    // Automatically redirect from intro to login/home
    useEffect(() => {
        const timer = setTimeout(() => {
            setIntroComplete(true);
        }, 3500); // match duration of your intro

        return () => clearTimeout(timer);
    }, []);

    return (
        <Router>
            {!introComplete ? (
                <IntroScreen />
            ) : (
                <AppContent user={user} />
            )}
        </Router>
    );
};

export default App;
