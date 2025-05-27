import React, { useEffect, useState } from "react";
import Bg from "../../../assets/bgLandingPages.jpg";
import axios from "axios";
import "sweetalert2/dist/sweetalert2.min.css";
import swal from "sweetalert2";

const AdminProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        username: "",
        email: "",
    });
    const [photo, setPhoto] = useState(null);

    const fetchUser = async () => {
        try {
            const token = sessionStorage.getItem("token");
            const response = await axios.get(
                "https://serverceriamusic-production.up.railway.app/api/user",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setUser(response.data.data);
        } catch (err) {
            setError(err.response?.data?.message || "Terjadi kesalahan");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const handleLogout = async () => {
        try {
            const result = await swal.fire({
                title: "Are you sure?",
                text: "You will be logged out of the system!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, log me out!",
                cancelButtonText: "Cancel",
            });

            if (result.isConfirmed) {
                const token = await sessionStorage.getItem("token");
                if (token) {
                    sessionStorage.removeItem("token");
                }
                navigate("/login");
                swal.fire(
                    "Logged Out!",
                    "You have been successfully logged out.",
                    "success"
                );
            }
        } catch (error) {
            console.error("Logout error:", error);
            swal.fire("Error!", "Something went wrong during logout.", "error");
        }
    };

    const handleEdit = () => {
        setEditData({
            username: user.username,
            email: user.email,
            photo: user.photo,
        });
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            const token = sessionStorage.getItem("token");
            if (!token) {
                throw new Error("No token found");
            }

            const formData = new FormData();
            formData.append("username", editData.username);
            formData.append("email", editData.email);
            if (photo) {
                formData.append("photo", photo);
            }

            const response = await axios.put(
                "https://serverceriamusic-production.up.railway.app/api/user/update",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setUser(response.data.data);
            setIsEditing(false);
            swal.fire("Success", "Profile updated successfully!", "success");
        } catch (err) {
            console.error("Error updating profile:", err);
            swal.fire("Error", "Failed to update profile.", "error");
        }
    };

    return (
        <>
            <div className="flex justify-center items-center md:items-start md:py-20 bg-gray-100 px-4">
                <div className="flex flex-col lg:flex-row items-center bg-[#222222] w-full lg:w-[90%] max-w-4xl rounded-lg shadow-lg overflow-hidden">
                    {/* Gambar Profil */}
                    <div className="w-full lg:w-1/2">
                        <img
                            src={Bg}
                            alt="Background"
                            className="w-full h-[200px] lg:h-full object-cover"
                        />
                    </div>
                    {/* Detail Profil */}
                    <div className="w-full lg:w-2/3 bg-white p-6">
                        <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">
                            Admin Profile
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    ID Admin
                                </label>
                                <input
                                    type="text"
                                    readOnly
                                    value={user?._id || ""}
                                    className="w-full border px-4 py-2 rounded-lg"
                                />
                            </div>
                            {isEditing ? (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            NAME
                                        </label>
                                        <input
                                            type="text"
                                            value={editData.username}
                                            onChange={(e) =>
                                                setEditData({
                                                    ...editData,
                                                    username: e.target.value,
                                                })
                                            }
                                            className="w-full border px-4 py-2 rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            EMAIL
                                        </label>
                                        <input
                                            type="text"
                                            value={editData.email}
                                            onChange={(e) =>
                                                setEditData({
                                                    ...editData,
                                                    email: e.target.value,
                                                })
                                            }
                                            className="w-full border px-4 py-2 rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Profile Photo
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) =>
                                                setPhoto(e.target.files[0])
                                            }
                                            className="w-full border px-4 py-2 rounded-lg"
                                        />
                                    </div>
                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                                        <button
                                            onClick={handleSave}
                                            className="w-full sm:w-auto bg-gray-500 text-white px-6 py-2 rounded-lg"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full sm:w-auto bg-blue-500 text-white px-6 py-2 rounded-lg"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            NAME
                                        </label>
                                        <input
                                            type="text"
                                            readOnly
                                            value={user.username}
                                            className="w-full border px-4 py-2 rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            EMAIL
                                        </label>
                                        <input
                                            type="text"
                                            readOnly
                                            value={user.email}
                                            className="w-full border px-4 py-2 rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Current Profile Photo
                                        </label>
                                        {user?.photo ? (
                                            <img
                                                src={`https://serverceriamusic-production.up.railway.app/${user?.photo}`}
                                                alt="Profile"
                                                className="w-50 h-20 rounded-lg mt-2 object-cover"
                                            />
                                        ) : (
                                            <p>No photo uploaded</p>
                                        )}
                                    </div>
                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                                        <button
                                            onClick={handleEdit}
                                            className="w-full sm:w-auto bg-gray-500 text-white px-6 py-2 rounded-lg"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full sm:w-auto bg-blue-500 text-white px-6 py-2 rounded-lg"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminProfile;
