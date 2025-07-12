import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Booking = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const itemsPerPage = 5;
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getDataBooking = async () => {
    try {
      if (!token) {
        navigate("/login");
        return;
      }

      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/booking`,
        header
      );
      if (res.status === 200) {
        setData(res.data.bookings);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error.message);
    }
  };

  const getBookingDetails = async (id) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/booking/${id}`,
        header
      );
      if (res.status === 200) {
        setSelectedBooking(res.data.booking);
      }
    } catch (error) {
      console.error("Error fetching booking details:", error.message);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `${import.meta.env.VITE_BASE_URL}/api/booking/${id}`,
            header
          )
          .then((res) => {
            if (res.status === 200) {
              Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: "The booking has been deleted.",
                confirmButtonText: "OK",
              });
              getDataBooking();
            }
          })
          .catch((error) => {
            console.error("Error deleting booking:", error.message);
            Swal.fire({
              icon: "error",
              title: "Error!",
              text: "Something went wrong. Please try again.",
              confirmButtonText: "OK",
            });
          });
      }
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      if (!searchQuery.trim()) {
        getDataBooking();
        return;
      }

      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/booking/search?name=${searchQuery}`,
        header
      );

      if (res.status === 200) {
        setData(res.data.data);
        setCurrentPage(1);
      }
    } catch (error) {
      console.log("Error during search:", error.message);
    }
  };

  useEffect(() => {
    getDataBooking();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      getDataBooking();
    }
  }, [searchQuery]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = (data || []).slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.max(1, Math.ceil((data || []).length / itemsPerPage));

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="w-full bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Manage Bookings
          </h2>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search by name"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              className="w-full px-4 py-2 border rounded"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Search
            </button>
          </div>
        </div>

        <table className="w-full table-auto bg-white shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">No.</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((booking, index) => (
              <tr key={booking._id} className="border-t">
                <td className="px-4 py-2">{data.indexOf(booking) + 1}</td>
                <td className="px-4 py-2">{booking.name}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => getBookingDetails(booking._id)}
                    className="bg-orange-500 text-white px-2 py-1 rounded hover:bg-orange-600"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => handleDelete(booking._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h3 className="text-lg font-semibold mb-4">Booking Details</h3>
            <p>
              <strong>Name:</strong> {selectedBooking.name}
            </p>
            <p>
              <strong>Date:</strong> {formatDate(selectedBooking.date)}
            </p>
            <p>
              <strong>Room:</strong> {selectedBooking.room_id.name}
            </p>
            <p>
              <strong>Start:</strong> {formatTime(selectedBooking.startTime)}
            </p>
            <p>
              <strong>End:</strong> {formatTime(selectedBooking.endTime)}
            </p>
            <p>
              <strong>Status:</strong> {selectedBooking.status}
            </p>
            <button
              onClick={() => setSelectedBooking(null)}
              className="mt-4 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
