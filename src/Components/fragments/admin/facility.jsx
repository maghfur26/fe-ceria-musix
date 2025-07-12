import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Facility = () => {
  const [facilities, setFacilities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [addFacilityForm, setAddFacilityForm] = useState({
    name: "",
    unit: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editFacilityForm, setEditFacilityForm] = useState({
    id: "",
    name: "",
    unit: "",
  });
  const itemPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const fetchFacilities = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/facilities`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      setFacilities(response.data.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error fetching facilities.",
      });
      console.error("Error fetching facilities:", error);
    }
  };

  const handleSearch = async (query) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/facility/search?name=${query}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      setFacilities(res.data.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Facility not found.",
      });
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      fetchFacilities();
    } else {
      setSearchTerm(value);
    }
  };

  const handleCancelModal = () => {
    setEditFacilityForm({ id: "", name: "", unit: "" });
    setAddFacilityForm({ name: "", unit: "" }); 
    setIsModalOpen(false); 
  };

  const handleAddFacilityChange = (e) => {
    const { name, value } = e.target;
    setAddFacilityForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditFacilityChange = (e) => {
    const { name, value } = e.target;
    setEditFacilityForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddFacilitySubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/facility`,
        addFacilityForm,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Facility added successfully.",
      });
      setIsModalOpen(false);
      setAddFacilityForm({ name: "", unit: "" });
      fetchFacilities();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error adding facility.",
      });
      console.error("Error adding facility:", error);
    }
  };

  const handleEditFacilitySubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/facility/${editFacilityForm.id}`,
        { name: editFacilityForm.name, unit: editFacilityForm.unit },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Facility updated successfully.",
      });
      setEditFacilityForm({ id: "", name: "", unit: "" });
      fetchFacilities();
      setIsModalOpen(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error updating facility.",
      });
      console.error("Error updating facility:", error);
    }
  };

  const handleDeleteFacility = (facilityId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the facility.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `${import.meta.env.VITE_BASE_URL}/api/facility/${facilityId}`,
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              },
            }
          );
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Facility has been deleted.",
          });
          fetchFacilities();
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error deleting facility.",
          });
          console.error("Error deleting facility:", error);
        }
      }
    });
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = facilities.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(facilities.length / itemPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex justify-center items-start p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col w-full max-w-4xl bg-white shadow-md rounded-lg p-6 lg:max-w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Facilities</h1>
          <button
            onClick={() => {
              setIsModalOpen(true);
              setEditFacilityForm({ id: "", name: "", unit: "" }); // Reset edit form state
            }}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-300"
          >
            Add Facility
          </button>
        </div>

        <div className="flex justify-end mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border rounded-l px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 transition duration-300"
            onClick={() => handleSearch(searchTerm)}
          >
            Search
          </button>
        </div>

        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">No</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((facility, index) => (
              <tr key={facility._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  {index + 1 + (currentPage - 1) * itemPerPage}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {facility.name}
                </td>
                <td className="border border-gray-300 px-4 py-2 flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setEditFacilityForm({
                        id: facility._id,
                        name: facility.name,
                        unit: facility.unit,
                      });
                      setIsModalOpen(true);
                    }}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteFacility(facility._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between mt-4">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            disabled={currentPage === 1}
            onClick={goToPreviousPage}
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            disabled={currentPage === totalPages}
            onClick={goToNextPage}
          >
            Next
          </button>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="bg-white rounded-lg p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {editFacilityForm.id ? (
                <form onSubmit={handleEditFacilitySubmit}>
                  <h2 className="text-xl font-bold mb-4">Edit Facility</h2>
                  <input
                    type="text"
                    name="name"
                    value={editFacilityForm.name}
                    onChange={handleEditFacilityChange}
                    className="w-full mb-4 px-4 py-2 border rounded"
                    placeholder="Facility Name"
                  />
                  <input
                    type="text"
                    name="unit"
                    value={editFacilityForm.unit}
                    onChange={handleEditFacilityChange}
                    className="w-full mb-4 px-4 py-2 border rounded"
                    placeholder="Unit"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelModal}
                      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleAddFacilitySubmit}>
                  <h2 className="text-xl font-bold mb-4">Add Facility</h2>
                  <input
                    type="text"
                    name="name"
                    value={addFacilityForm.name}
                    onChange={handleAddFacilityChange}
                    className="w-full mb-4 px-4 py-2 border rounded"
                    placeholder="Facility Name"
                  />
                  <input
                    type="text"
                    name="unit"
                    value={addFacilityForm.unit}
                    onChange={handleAddFacilityChange}
                    className="w-full mb-4 px-4 py-2 border rounded"
                    placeholder="Unit"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Add Facility
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelModal}
                      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Facility;
