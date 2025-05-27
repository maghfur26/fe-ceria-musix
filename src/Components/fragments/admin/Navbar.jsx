import React, { useState, useEffect, useRef } from "react";
import { IoIosSearch } from "react-icons/io";
import { CiMenuFries } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import axios from "axios";
import WeekendIcon from "@mui/icons-material/Weekend";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PaymentIcon from "@mui/icons-material/Payment";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  const handleAccountClick = () => {
    setShowProfile(!showProfile);
  };

  const handleLogout = () => {
    try {
      sessionStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolling(true);
    } else {
      setIsScrolling(false);
    }
  };

  useEffect(() => {
    handleScroll();

    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target) &&
        event.target.id !== "account-icon"
      ) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const listMenu = [
    {
      id: 1,
      title: "Dashboard",
      icon: <WeekendIcon />,
      link: "/admin",
    },
    {
      id: 2,
      title: "Booking",
      icon: <MenuBookIcon />,
      link: "/admin/booking",
    },
    {
      id: 3,
      title: "Room",
      icon: <WeekendIcon />,
      link: "/admin/rooms",
    },
    {
      id: 4,
      title: "Payment",
      icon: <PaymentIcon />,
      link: "/admin/payment",
    },
    {
      id: 5,
      title: "Facility",
      icon: <WeekendIcon />,
      link: "/admin/facility",
    },
    {
      id: 6,
      title: "Profile",
      icon: <AccountBoxIcon />,
      link: "/admin/profile",
    },
  ];

  const fetchUser = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get(
        "https://serverceriamusic-production.up.railway.app/api/user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data.data);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <nav
      className="py-4 px-4 flex items-center justify-between w-full relative z-20"
      style={{ backgroundColor: isScrolling ? "#3B9DF8" : "transparent" }}
    >
      <img src={logo} alt="logo" className="w-[100px] object-contain md:hidden lg:block" />
      <div className="items-center hidden md:flex lg:hidden">
        <ul className="items-center gap-[20px] text-[1rem] flex ml-10">
          {listMenu.map((item) => (
            <li
              key={item.id}
              className="hover:border-b-[#3B9DF8] hover:text-blue-400 border-b-[2px] border-transparent transition-all duration-500 cursor-pointer capitalize"
            >
              <Link to={item.link} className="flex items-center gap-2">
                <span className="text-[1.2rem]">{item.icon}</span>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center gap-[10px]">
        <div
          onClick={handleAccountClick}
          className="h-10 w-10 mr-4 cursor-pointer shadow-sm shadow-black rounded-full bg-black flex items-center justify-center relative overflow-hidden"
        >
          <img
            className="w-full h-full object-cover"
            src={`https://serverceriamusic-production.up.railway.app/${user.photo}`}
            alt="profile"
            id="account-icon"
          />
        </div>

        <CiMenuFries
          className="text-[1.6rem] text-[#424242] cursor-pointer md:hidden flex"
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        />
      </div>

      {showProfile && (
        <div
          ref={profileRef}
          className="absolute z-50 top-[60px] right-0 w-[300px] bg-white p-6 shadow-lg rounded-lg border border-gray-200"
        >
          <h2 className="text-xl font-semibold text-gray-800">Profile Admin</h2>
          <div className="mt-4 text-gray-700 space-y-2">
            <p>
              <span className="font-medium">Nama:</span> {user.username}
            </p>
            <p>
              <span className="font-medium">Email:</span> {user.email}
            </p>
          </div>
          <button
            className="mt-6 w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition"
            onClick={() => {
              setShowProfile(false);
              handleLogout();
            }}
          >
            Logout
          </button>
        </div>
      )}

      <aside
        className={`${
          mobileSidebarOpen
            ? "translate-x-0 opacity-100 z-20"
            : "translate-x-full opacity-0 z-[-1]"
        } md:hidden bg-white fixed top-[60px] right-0 w-full sm:w-[300px] p-4 rounded-md shadow-lg transition-all duration-300 ease-in-out`}
      >
        <h1 className="font-semibold text-gray-800 text-lg mb-4">Menu</h1>
        <ul className="flex flex-col items-start gap-3">
          {listMenu.map((item) => (
            <li key={item.id} className="w-full">
              <a
                href={item.link}
                className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-gray-100 transition-colors duration-300 w-full text-gray-700"
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </nav>
  );
};

export default Navbar;
