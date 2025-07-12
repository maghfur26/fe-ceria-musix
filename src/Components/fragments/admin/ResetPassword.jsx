import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!newPassword || newPassword.length < 8) {
      setError("Password baru harus minimal 8 karakter");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/reset-password/:token`,
          { token, newPassword }
      );

      if (response.status !== 200) {
        throw new Error(response.data.message);
      } else {
        Swal.fire({
          icon: "success",
          title: "Password berhasil diatur ulang",
          text: "Silakan login dengan password baru Anda.",
          confirmButtonText: "Login",
          confirmButtonColor: "#3b82f6",
        }).then(() => {
          navigate("/login");
        });
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Terjadi kesalahan saat mengatur ulang password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
        onSubmit={handleResetPassword}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Atur Ulang Password
        </h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="mb-4">
          <label htmlFor="newPassword" className="block font-medium mb-2">
            Password Baru
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan password baru"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block font-medium mb-2">
            Konfirmasi Password Baru
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Konfirmasi password baru"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition disabled:opacity-50"
        >
          {loading ? "Mengatur Ulang..." : "Atur Ulang Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
