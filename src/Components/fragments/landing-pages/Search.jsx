import "aos/dist/aos.css";
import AOS from "aos";
import Card from "../../elements/Card";
import { useEffect, useState } from "react";
import { ReactTyped } from "react-typed";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bgLanding from "../../../assets/bg.jpg";

const Search = () => {
  const [listStudio, setListStudio] = useState([]);
  const [category, setCategory] = useState("");
  const [filteredStudios, setFilteredStudios] = useState([]);
  const navigate = useNavigate();

  const getRooms = async () => {
    try {
      const res = await axios.get(
        "https://ceriamusicapi-production.up.railway.app/api/room"
      );
      if (res.status === 200) {
        setListStudio(res.data.data);
        setFilteredStudios(res.data.data);
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleSearch = () => {
    if (category === "All") {
      setFilteredStudios(listStudio);
    } else if (category) {
      const filteredRooms = listStudio.filter(
        (room) => room.category === category
      );
      setFilteredStudios(filteredRooms);
    } else {
      setFilteredStudios(listStudio);
    }
  };

  useEffect(() => {
    AOS.init();
    getRooms();
  }, []);

  return (
    <div
      className="flex flex-col font-manrope bg-slate-100 py-20 mb-20"
      id="booking"
    >
      <h1
        className="pb-4 text-[30px] font-thin ml-7 mb-4 first-letter:text-5xl first-letter:font-bold  lg:ml-10"
        data-aos="fade-right"
        data-aos-duration="700"
        data-aos-delay="200"
      >
        <ReactTyped
          strings={["Search Studio", "Look For Studio", "Find Studio"]}
          typeSpeed={170}
          backSpeed={100}
          backDelay={1500}
          loop
        />
      </h1>
      <div
        className="flex h-[342px] w-[95dvw] rounded-3xl mx-auto justify-center items-center flex-col shadow-black drop-shadow-lg"
        style={{
          backgroundImage: `url(${bgLanding})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        data-aos="fade-left"
        data-aos-duration="1000"
        data-aos-delay="100"
      >
        <div className="bg-white border border-black px-5 lg:px-10 py-5 rounded-3xl flex flex-col md:flex-row justify-center gap-2 w-full lg:w-[1100px]">
          <div className="flex justify-center items-center border border-black p-1 rounded-full w-full md:w-[223px] lg:w-[223px] text-2xl lg:text-[30px]">
            <select
              className="text-lg px-4 p-1 outline-none bg-transparent w-full"
              name="room"
              id="room"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option className="opacity-50" disabled value="">
                Category
              </option>
              <option value="All">All</option>
              <option value="Gold">Gold</option>
              <option value="Silver">Silver</option>
              <option value="Platinum">Platinum</option>
              <option value="Bronzo">Bronzo</option>
              <option value="Supreme">Supreme</option>
              <option value="Band Practice">Band Practice</option>
            </select>
          </div>
          <div className="flex justify-center items-center border border-black p-1 rounded-full w-full md:w-[223px] lg:w-[223px] text-2xl lg:text-[30px]">
            <select
              name="facility"
              id="facility"
              className="text-lg px-4 p-1 outline-none bg-transparent w-full"
              defaultValue="Facility"
            >
              <option className="opacity-50" disabled>
                Facility
              </option>
              <option value="ac room">AC Room</option>
              <option value="kipas angin">Kipas Angin</option>
            </select>
          </div>
          <button
            onClick={handleSearch}
            className="text-xl text-center bg-slate-900 text-white px-5 rounded-full font-semibold hover:bg-slate-800 w-full md:w-[198px] lg:w-[198px]"
          >
            Search
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-4">
        {filteredStudios.map((studio) => {
          const formattedPrice = formatPrice(studio.price_perhour);
          return (
              <Card
                  className="my-4 lg:my-14"
                  img={`https://serverceriamusic-production.up.railway.app${studio.photo}`}
                  title={studio.name}
                  status="Available"
                  price={formattedPrice}
                  key={studio._id}
                  id={studio._id}
                  onClick={() => navigate(`/room/${studio._id}`)}
              />
          );
        })}
      </div>
    </div>
  );
};

export default Search;
