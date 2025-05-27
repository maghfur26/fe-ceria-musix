import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const FormAddRoom = () => {
  const navigate = useNavigate();
  const [facilities, setFacilities] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price_perhour: "",
    photo: "",
    category: "",
    facilities: [{ facility_id: "" }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("File selected:", file);
      setFormData((prevData) => ({
        ...prevData,
        photo: file,
      }));
    }
  };

  const handleAddFacility = () => {
    setFormData((prevData) => ({
      ...prevData,
      facilities: [...prevData.facilities, { facility_id: "" }],
    }));
  };

  const handleFacilityChange = (index, e) => {
    const selectedFacilityId = e.target.value;
    const newFacilities = [...formData.facilities];
    newFacilities[index].facility_id = selectedFacilityId;
    setFormData((prevData) => ({
      ...prevData,
      facilities: newFacilities,
    }));
  };

  const handleRemoveFacility = (index) => {
    const newFacilities = formData.facilities.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      facilities: newFacilities,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("Token tidak ditemukan! Anda perlu login terlebih dahulu.");
      return;
    }
  
    if (!formData.photo) {
      alert("Foto wajib diisi!");
      return;
    }
  
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("price_perhour", formData.price_perhour);
    formDataToSend.append("category", formData.category);
  
    if (formData.photo instanceof File) {
      formDataToSend.append("photo", formData.photo);
    } else {
      console.error("Photo is not a valid file:", formData.photo);
      alert("Photo is not a valid file.");
      return;
    }
  
    formData.facilities.forEach((facility, index) => {
      formDataToSend.append(
        `facilities[${index}][facility_id]`,
        facility.facility_id
      );
    });
  
    try {
      const res = await axios.post(
        "https://serverceriamusic-production.up.railway.app/api/room/add",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Room added successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/admin/rooms");
        });
      }
    } catch (error) {
      console.log("Error adding room:", error.response || error.message);
      alert("Terjadi kesalahan saat menambahkan room.");
    }
  };
  

  const getFacilities = async () => {
    try {
      const res = await axios.get(
        "https://serverceriamusic-production.up.railway.app/api/facilities", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      setFacilities(res.data.data);
    } catch (error) {
      console.log("Error fetching facilities:", error.response || error.message);
      return [];
    }
  };

  useEffect(() => {
    getFacilities();
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold text-center mb-6">Add Room</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Price per Hour:
        </label>
        <input
          type="number"
          name="price_perhour"
          value={formData.price_perhour}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Photo:
        </label>
        <input
          type="file"
          name="photo"
          onChange={handleFileChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Category:
        </label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">
          Facilities:
        </label>
        {formData.facilities.map((facility, index) => (
          <div key={index} className="flex items-center space-x-2 mt-2">
            <select
              name={`facilities[${index}][facility_id]`}
              value={facility.facility_id}
              onChange={(e) => handleFacilityChange(index, e)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Facility</option>
              {facilities.map((facility) => (
                <option key={facility._id} value={facility._id}>
                  {facility.name} {/* Display the name but send the _id */}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => handleRemoveFacility(index)}
              className="text-sm text-red-500 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddFacility}
          className="mt-3 text-sm text-blue-500 hover:underline"
        >
          Add Facility
        </button>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default FormAddRoom;
