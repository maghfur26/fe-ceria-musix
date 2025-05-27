import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import axios from "axios";
import CardStudio from "./CardStudio";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CardAdmin = ({ ...props }) => {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const res = await axios.get(props.url);
      if (res.status === 200) {
        setData(res.data.data);
        setAllData(res.data.data);
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleView = (data) => {
    try {
      setSelectedData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const closeView = () => {
    setSelectedData(null);
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const token = sessionStorage.getItem("token");
        const res = await axios.delete(
          `https://serverceriamusic-production.up.railway.app/api/room/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.status === 200) {
          Swal.fire("Deleted!", "Your room has been deleted.", "success");
          getData();
        }
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error!", "There was an issue deleting the room.", "error");
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-room/${id}`);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    if (query === "") {
      setData(allData);
    } else {
      const filtered = allData.filter((room) =>
        room.name.toLowerCase().includes(query)
      );
      setData(filtered);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:mt-10">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => navigate("/admin/add-room")}
          className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Add Rooms
        </button>
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-48 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            onChange={handleSearch}
          />
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a 9 9 0 11-9-9 9 9 0 019 9zm-2 0a7 7 0 10-7-7 7 7 0 007 7z"
              />
            </svg>
          </span>
        </div>
      </div>
      <div className="title">
        <h1 className="text-2xl font-semibold mx-2 py-4">{props.title}</h1>
      </div>
      <div className="grid px-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((datas) => (
          <div key={datas._id} className="bg-gray-100 rounded-lg p-4 shadow">
            <h2 className="text-lg font-semibold mb-4">{datas.name}</h2>
            <div className="flex flex-wrap gap-2 justify-start">
              <button
                onClick={() => handleDelete(datas._id)}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
              >
                <DeleteIcon /> <span>Delete</span>
              </button>
              <button
                onClick={() => handleEdit(datas._id)}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
              >
                <EditIcon /> <span>Edit</span>
              </button>
              <button
                onClick={() => handleView(datas)}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
              >
                <RemoveRedEyeIcon /> <span>View</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="h-screen md:h-[460px] flex flex-col bg-white rounded-lg shadow-lg p-6">
            <CardStudio
              title={selectedData.name}
              img={`https://serverceriamusic-production.up.railway.app/${selectedData.photo}`}
              status={selectedData.status}
              price={selectedData.price_perhour}
              facilities={selectedData.facilities}
            />

            <div className="mt-4 flex justify-end">
              <button
                onClick={closeView}
                className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardAdmin;
