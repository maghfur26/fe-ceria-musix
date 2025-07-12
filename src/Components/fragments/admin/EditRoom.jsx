import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const token = sessionStorage.getItem("token");

  const [formData, setFormData] = useState({
    name: "",
    status: "",
    price_perhour: "",
    photo: "",
  });

  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/room/${id}`
        );
        if (res.status === 200) {
          setFormData(res.data.data);
        } else {
          throw new Error(res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRoomData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataObj = new FormData();
      formDataObj.append("name", formData.name);
      formDataObj.append("status", formData.status);
      formDataObj.append("price_perhour", formData.price_perhour);
      if (file) {
        formDataObj.append("photo", file);
      }

      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/room/${id}`,
        formDataObj,
        headers
      );

      if (res.status === 200) {
        alert("Room updated successfully!");
        navigate("/admin/rooms");
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg mx-auto mt-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Edit Room</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block text-gray-700 text-sm font-medium mb-2">Room Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter room name"
            required
          />
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 text-sm font-medium mb-2">Status</label>
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter status (e.g., Available/Unavailable)"
            required
          />
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 text-sm font-medium mb-2">Price Per Hour</label>
          <input
            type="number"
            name="price_perhour"
            value={formData.price_perhour}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter price per hour"
            required
          />
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 text-sm font-medium mb-2">Upload Photo</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
          />
        </div>
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={() => navigate("/admin/rooms")}
            className="bg-gray-400 hover:bg-gray-500 text-white py-3 px-6 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRoom;
