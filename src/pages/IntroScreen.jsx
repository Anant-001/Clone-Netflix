import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "/public/netflix-logo.png"; // Replace with your animated or static logo

const IntroScreen = () => {
    const [fadeOut, setFadeOut] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => setFadeOut(true), 2500);
        const redirectTimer = setTimeout(() => navigate("/login"), 3500);
        return () => {
            clearTimeout(timer);
            clearTimeout(redirectTimer);
        };
    }, [navigate]);

    return (
        <div className="h-screen w-screen bg-black flex items-center justify-center">
            <img
                src={logo}
                alt="Netflix Logo"
                className={`w-72 transition-opacity duration-1000 ${
                    fadeOut ? "opacity-0 scale-90" : "opacity-100 scale-100"
                }`}
            />
        </div>
    );
};

export default IntroScreen;
