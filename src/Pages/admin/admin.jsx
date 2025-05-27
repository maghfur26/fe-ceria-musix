import Navbar from "../../Components/fragments/admin/Navbar";
import Sidebar from "../../Components/fragments/admin/Sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Admin = ({children, title}) => {
  const [isCheckingToken, setIsCheckingToken] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      setIsCheckingToken(false);
    }
  }, [navigate]);

  if (isCheckingToken) {
    return null;
  }

  return (
    <div className="flex bg-white h-screen">
      <div className="hidden lg:block fixed">
        <Sidebar />
      </div>
      <div className="w-full lg:ml-64">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Admin;
