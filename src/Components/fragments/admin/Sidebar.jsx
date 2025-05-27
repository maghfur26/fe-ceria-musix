import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import WeekendIcon from "@mui/icons-material/Weekend";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PaymentIcon from "@mui/icons-material/Payment";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

const Sidebar = () => {
  const [activeIcon, setActiveIcon] = useState(null);
  const navigate = useNavigate();

  const handleIconClick = (target) => {
    setActiveIcon(target); 
    navigate(target); 
  };

  const handleLogout = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will be logged out of the system!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, log me out!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        const token = await sessionStorage.getItem("token");
        if (token) {
          sessionStorage.removeItem("token");
        }
        navigate("/login");
        Swal.fire(
          "Logged Out!",
          "You have been successfully logged out.",
          "success"
        );
      }
    } catch (error) {
      console.error("Logout error:", error);
      Swal.fire("Error!", "Something went wrong during logout.", "error");
    }
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <WeekendIcon />, target: "/admin" },
    { id: "room", label: "Room", icon: <WeekendIcon />, target: "/admin/rooms" },
    { id: "booking", label: "Booking", icon: <MenuBookIcon />, target: "/admin/booking" },
    { id: "fasility", label: "Fasility", icon: <AssignmentIcon />, target: "/admin/facility" },
    { id: "payment", label: "Payment", icon: <PaymentIcon />, target: "/admin/payment" },
    { id: "profile", label: "Profile", icon: <AccountBoxIcon />, target: "/admin/profile" },
  ];

  return (
    <aside className="h-screen w-64 p-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg flex flex-col justify-between">
      <div>
        <div className="flex flex-col gap-4">
          <h1>Menu</h1>
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                activeIcon === item.target
                  ? "bg-white text-blue-600 shadow-md"
                  : "hover:bg-blue-600 hover:shadow-lg"
              }`}
              onClick={() => handleIconClick(item.target)}
            >
              <div
                className={`text-2xl transition-transform duration-300 ${
                  activeIcon === item.target ? "rotate-12" : ""
                }`}
              >
                {item.icon}
              </div>
              <span className="text-lg font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="p-3 rounded-lg bg-red-500 hover:bg-red-600 transition-all duration-300"
      >
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
