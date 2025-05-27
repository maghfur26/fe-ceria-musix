import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Aos from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";

const DetailRoom = () => {
  const [room, setRoom] = useState({});
  const { id } = useParams();
  const time = ["08:00", "10:00", "13:00", "15:00", "17:00", "19:00"];
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getRoom = async () => {
    try {
      const res = await axios.get(
          `https://serverceriamusic-production.up.railway.app/api/room/${id}`
      );
      const data = res.data.data;
      setRoom(data);
    } catch (error) {
      console.log("error get room by id", error.response || error.message);
    }
  };

  const handleBooking = () => {
    navigate(`/booking/${id}`);
  };

  useEffect(() => {
    getRoom();
    Aos.init();
  }, [id]);

  return (
      <div className="w-full md:w-[80%] mt-4 md:mt-20 mx-auto md:h-[350px] gap-4 font-manrope flex flex-col md:flex-row items-center justify-center px-10">
          <aside
              data-aos="fade-right"
              data-aos-duration="1000"
              data-aos-delay="100"
              data-aos-easing="ease-in-out"
              className="md:mr-4 md:w-[45%] h-[350px] rounded-xl overflow-hidden"
          >
              <img
                  src={`https://serverceriamusic-production.up.railway.app/${room.photo}`}
                  className="w-full h-full object-cover"
                  alt={room.name || "Room Image"}
              />
          </aside>
          <div
              data-aos="fade-left"
              data-aos-duration="1000"
              data-aos-delay="500"
              data-aos-easing="ease-in-out"
              className="md:w-[55%] h-[350px] flex flex-col gap-4"
          >
              <h1 className="text-3xl">{room.name}</h1>
              <div className="flex gap-4 items-center">
                  <p className="text-md py-2 bg-blue-500 text-white px-3 rounded-full border border-blue-300">
                      {room.status}
                  </p>
                  <span>{formatPrice(room.price_perhour)} / hour</span>
              </div>
              <div className="flex flex-col px-2 mt-4">
                  <h1 className="text-lg font-semibold">Facilities :</h1>
                  <ul className="list-disc flex gap-5 flex-wrap">
                      {room.facilities?.length > 0 ? (
                          room.facilities.map((facility) => (
                              <li
                                  key={facility._id}
                                  className="list-none text-lg mt-2"
                              >
                                  {facility.facility_id?.name ||
                                      "Unknown Facility"}{" "}
                                  <span className="text-sm text-gray-500">
                                      (Unit: {facility.facility_id?.unit || 0})
                                  </span>
                              </li>
                          ))
                      ) : (
                          <p>No facilities available.</p>
                      )}
                  </ul>
                  <ul className="time w-full mt-10 grid grid-cols-3 gap-2 lg:w-[400px]">
                      {time.map((time) => (
                          <li
                              key={time}
                              className="text-center list-none border border-black px-2 rounded-full w-[80px] lg:w-[100px]"
                          >
                              {time}
                          </li>
                      ))}
                  </ul>
              </div>
              <button
                  onClick={handleBooking}
                  className="mt-4 py-2 rounded-full border border-[#afd8de] bg-blue-500 text-white lg:w-[400px] hover:bg-blue-600 transition ease-linear duration-300"
              >
                  Booking
              </button>
          </div>
      </div>
  );
};

export default DetailRoom;
