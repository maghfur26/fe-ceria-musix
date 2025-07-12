import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoReorderThreeSharp } from "react-icons/io5";
import Logo from "../../../assets/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (hash) => {
    if (location.pathname !== "/") {
      navigate(`/#${hash}`);
    } else if (hash === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const targetElement = document.getElementById(hash);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      } else {
        console.warn(`Element with id "${hash}" not found.`);
      }
    }
  };
  
  

  return (
    <div
      className={`sticky py-4 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/50 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-2">
        <div className="pt-2 hidden lg:flex font-[Inter] lg:flex-row lg:justify-between max-w-full">
          <div
            className="flex flex-row text-2xl uppercase font-bold"
            // data-aos="fade-right"
          >
            <img src={Logo} alt="Logo" width={250} height={0} />
          </div>
          <div>
            <div
              className="flex flex-row gap-2 text-xl mt-2 font-[Inter]"
              // data-aos="fade-left"
            >
              <button
                className="px-4 py-2 font-manrope hover:bg-blue-600 transition-all ease-in-out duration-500 hover:rounded-full hover:text-white"
                onClick={() => handleNavClick("home")}
              >
                Home
              </button>
              <button
                className="px-4 py-2 font-manrope hover:bg-blue-600 transition-all ease-in-out duration-500 hover:rounded-full hover:text-white"
                onClick={() => handleNavClick("booking")}
              >
                Booking
              </button>
              <button
                className="px-4 py-2 font-manrope hover:bg-blue-600 hover:rounded-full transition-all ease-in-out duration-500 hover:text-white"
                onClick={() => handleNavClick("about")}
              >
                About
              </button>
              <button
                className="px-4 py-2 font-manrope hover:bg-blue-600 hover:rounded-full transition-all ease-in-out duration-500 hover:text-white"
                onClick={() => handleNavClick("contact")}
              >
                Contact
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="lg:hidden flex flex-row justify-between items-center">
          <img
            src={Logo}
            alt="Logo"
            width={180}
            height={0}
            // data-aos="fade-right"
          />
          <div>
            <button
              className="px-2 pt-2 transition duration-200 rounded focus:outline-none hover:bg-deep-purple-50 focus:bg-deep-purple-50"
              onClick={() => setIsMenuOpen(true)}
              // data-aos="fade-left"
            >
              <IoReorderThreeSharp className="text-3xl" />
            </button>
            {isMenuOpen && (
              <div className="absolute top-0 left-0 w-full z-50">
                <div className="p-5 bg-white/50 backdrop-blur-md shadow-md text-white dark:bg-slate-100/75 rounded-md ">
                  <div className="flex items-center justify-between mb-4">
                    <button
                      aria-label="Close Menu"
                      title="Close Menu"
                      className="p-2 transition duration-200 rounded  focus:bg-gray-200 focus:outline-none"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg
                        className="w-5 text-black"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3c-0.4,0.4-0.4,1,0,1.4 C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3 C20.1,5.3,20.1,4.7,19.7,4.3z" />
                      </svg>
                    </button>
                  </div>
                  <div
                    onClick={() => setIsMenuOpen(false)}
                    className="flex flex-col items-center text-xl font-semibold gap-2"
                  >
                    <button
                      className="p-2 hover:text-blue-700 text-black"
                      onClick={() => handleNavClick("home")}
                    >
                      Home
                    </button>
                    <button
                      className="p-2 hover:text-blue-700 text-black"
                      onClick={() => handleNavClick("booking")}
                    >
                      Booking
                    </button>
                    <button
                      className="p-2 hover:text-blue-700 text-black"
                      onClick={() => handleNavClick("about")}
                    >
                      About
                    </button>
                    <button
                      className="p-2 hover:text-blue-700 text-black"
                      onClick={() => handleNavClick("contact")}
                    >
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
