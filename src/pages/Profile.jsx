// pages/Profile.jsx
import React from "react";
import { getAuth } from "firebase/auth";

const Profile = () => {
    const user = getAuth().currentUser;

    return (
        <div className="pt-24 px-8 text-white">
            <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
            <div className="flex items-center gap-6">
                <img
                    src={user?.photoURL || "/default-avatar.png"}
                    alt="profile"
                    className="w-20 h-20 rounded-full"
                />
                <div>
                    <p className="text-lg font-medium">{user?.displayName || "Anonymous"}</p>
                    <p className="text-gray-400">{user?.email}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
