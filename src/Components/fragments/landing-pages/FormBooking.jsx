import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const FormBooking = () => {
  const { id } = useParams();
  const [room, setRoom] = useState({});
  const [loading, setLoading] = useState(false); // Loading state
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    date: "",
    startTime: "",
    endTime: "",
  });
  const navigate = useNavigate();

  const getRoom = async () => {
    try {
      const res = await axios.get(
          `https://serverceriamusic-production.up.railway.app/api/room/${id}`
      );
      const data = res.data.data;
      setRoom(data);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to fetch room details. Please try again.",
        icon: "error",
        confirmButtonColor: "#3b82f6",
      });
    }
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let i = 8; i < 21; i++) {
      const hour = i < 10 ? `0${i}` : i;
      options.push(
        <option key={`${hour}:00`} value={`${hour}:00`}>
          {`${hour}:00`}
        </option>
      );
    }
    return options;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    try {
      const startTime = new Date(`${formData.date}T${formData.startTime}`);
      const endTime = new Date(`${formData.date}T${formData.endTime}`);
      const durationInHours = (endTime - startTime) / (1000 * 60 * 60);

      if (durationInHours <= 0 || durationInHours % 1 !== 0) {
        setLoading(false);
        Swal.fire({
          title: "Error",
          text: "Duration must be in full hours (e.g., 1 hour, 2 hours).",
          icon: "error",
          confirmButtonColor: "#3b82f6",
        });
        return;
      }

      const requestData = {
        room_id: id,
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
      };

      const response = await axios.post(
          "https://serverceriamusic-production.up.railway.app/api/booking",
          requestData
      );

      if (response.status === 200) {
        const paymentId = response.data.newBooking._id;
        Swal.fire({
          title: "Success",
          text: "Booking successful! Click OK to proceed to payment.",
          icon: "success",
          confirmButtonColor: "#3b82f6",
        }).then(() => {
          navigate(`/payment/${paymentId}`, {
            state: { ...formData, room },
          });
        });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error",
        confirmButtonColor: "#3b82f6",
      });
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    getRoom();
  }, []);

  return (
      <>
          <Backdrop open={loading} style={{ zIndex: 1000, color: "#fff" }}>
              <CircularProgress color="inherit" />
          </Backdrop>
          <div
              className="min-h-screen flex items-center justify-center p-6"
              style={{
                  backgroundImage: `url(https://serverceriamusic-production.up.railway.app/${room.photo})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
              }}
          >
              <div className="bg-white bg-opacity-80 shadow-lg rounded-lg p-8 w-full max-w-md">
                  <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
                      Booking {room.name} Studio
                  </h1>
                  <form
                      onSubmit={handleSubmit}
                      className="font-manrope space-y-6"
                  >
                      {/* User Name Input */}
                      <div className="flex flex-col">
                          <label
                              htmlFor="name"
                              className="text-gray-700 font-medium mb-2"
                          >
                              User Name
                          </label>
                          <input
                              className="outline-none border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-400"
                              type="text"
                              id="name"
                              name="name"
                              placeholder="Your Name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                          />
                      </div>
                      {/* Phone Number Input */}
                      <div className="flex flex-col">
                          <label
                              htmlFor="phoneNumber"
                              className="text-gray-700 font-medium mb-2"
                          >
                              Phone Number
                          </label>
                          <input
                              className="outline-none border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-400"
                              type="text"
                              id="phoneNumber"
                              name="phoneNumber"
                              placeholder="Your Phone Number"
                              value={formData.phoneNumber}
                              onChange={handleChange}
                              required
                          />
                      </div>
                      {/* Date Input */}
                      <div className="flex flex-col">
                          <label
                              htmlFor="date"
                              className="text-gray-700 font-medium mb-2"
                          >
                              Date
                          </label>
                          <input
                              className="outline-none border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-400"
                              type="date"
                              id="date"
                              name="date"
                              value={formData.date}
                              onChange={handleChange}
                              required
                          />
                      </div>
                      {/* Start Time Select */}
                      <div className="flex flex-col">
                          <label
                              htmlFor="startTime"
                              className="text-gray-700 font-medium mb-2"
                          >
                              Start Time
                          </label>
                          <select
                              className="outline-none border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-400"
                              id="startTime"
                              name="startTime"
                              value={formData.startTime}
                              onChange={handleChange}
                              required
                          >
                              {generateTimeOptions()}
                          </select>
                      </div>
                      {/* End Time Select */}
                      <div className="flex flex-col">
                          <label
                              htmlFor="endTime"
                              className="text-gray-700 font-medium mb-2"
                          >
                              End Time
                          </label>
                          <select
                              className="outline-none border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-400"
                              id="endTime"
                              name="endTime"
                              value={formData.endTime}
                              onChange={handleChange}
                              required
                          >
                              {generateTimeOptions()}
                          </select>
                      </div>
                      {/* Submit Button */}
                      <button
                          type="submit"
                          disabled={loading}
                          className={`w-full ${
                              loading
                                  ? "bg-gray-500 cursor-not-allowed"
                                  : "bg-blue-500 hover:bg-blue-600"
                          } text-white font-semibold py-2 rounded-md shadow-md transition-all duration-200`}
                      >
                          {loading ? "Processing..." : "Submit"}
                      </button>
                  </form>
              </div>
          </div>
      </>
  );
};

export default FormBooking;
