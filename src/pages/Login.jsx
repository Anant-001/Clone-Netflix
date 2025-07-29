import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider, signInWithPopup } from "../firebase";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    const handleLogin = async () => {
        setLoading(true);
        try {
            await signInWithPopup(auth, provider);
            navigate("/");
        } catch (error) {
            alert("Login failed");
            console.error("Login error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
            style={{ backgroundImage: "url('/netflix-bg.jpg')" }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            {/* Login Box */}
            <div className="z-10 bg-white/10 p-10 rounded-xl shadow-xl text-center border border-white/20 w-[90%] max-w-md">
                <h1 className="text-4xl font-bold text-red-600 mb-8 tracking-widest font-extrabold">
                    NETFLIX
                </h1>

                <h2 className="text-2xl font-semibold text-white mb-4">Welcome Back</h2>
                <p className="text-sm text-gray-300 mb-8">
                    Sign in to continue watching your favorite shows
                </p>

                <button
                    onClick={handleLogin}
                    className="w-full flex items-center justify-center gap-3 bg-white text-black px-6 py-3 rounded-md font-medium text-lg hover:bg-gray-200 transition disabled:opacity-60"
                    disabled={loading}
                >
                    {loading ? (
                        <div className="h-6 w-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <>
                            <FcGoogle size={24} />
                            Sign in with Google
                        </>
                    )}
                </button>
            </div>

            {/* Netflix Outro Logo Animation */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 0.9 }}
                transition={{
                    repeat: Infinity,
                    repeatType: "mirror",
                    duration: 2,
                    ease: "easeInOut"
                }}
            >
                <img
                    src="/Netflix_2015_logo.svg"
                    alt="Netflix N"
                    className="h-12 drop-shadow-[0_0_10px_rgba(255,0,0,0.7)]"
                />
            </motion.div>
        </div>
    );
};

export default Login;
