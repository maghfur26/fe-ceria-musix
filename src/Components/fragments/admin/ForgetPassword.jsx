import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
          "https://serverceriamusic-production.up.railway.app/api/forgot-password",
          { email }
      );
      
      if (res.status !== 200) {
        throw new Error(res.data.message);
      }

      Swal.fire({
        icon: "success",
        title: "Permintaan Dikirim",
        text: "Silakan cek email Anda untuk tautan reset password.",
        confirmButtonText: "OK",
        customClass: {
          confirmButton:
            "bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded",
        },
      });
      setEmail("");
    } catch (err) {
      console.error("Reset password error:", err);
      setError(
        err.response?.data?.message ||
          "Gagal mengirim permintaan reset password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
          Forget Password
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Masukkan email Anda untuk menerima tautan reset password.
        </p>
        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Masukkan email Anda"
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-lg text-white font-semibold ${
              loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Mengirim..." : "Kirim Tautan Reset"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
