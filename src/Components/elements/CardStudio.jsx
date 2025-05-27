import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";

const CardStudio = ({ ...props }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="1000"
      data-aos-delay="200"
      className="max-w-5xl mx-auto my-6 flex flex-col md:flex-row rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white"
    >
      {/* Image Section */}
      <aside className="w-full md:w-1/2 h-60 md:h-72">
        <img
          src={props.img}
          alt={props.title || "Studio Image"}
          className="w-full h-full object-cover"
        />
      </aside>

      {/* Content Section */}
      <div className="w-full md:w-1/2 p-6 flex flex-col gap-4 justify-between">
        {/* Title */}
        <header className="text-xl md:text-2xl font-semibold text-gray-800">
          {props.title}
        </header>

        {/* Status and Price */}
        <div className="flex items-center gap-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              props.status === "Available"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {props.status}
          </span>
          <span className="text-lg font-bold text-gray-700">
            {formatPrice(props.price)} <span className="text-sm">/ hour</span>
          </span>
        </div>

        {/* Facilities */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Facilities:
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {props.facilities?.length > 0 ? (
              props.facilities.map((facility, index) => (
                <li
                  key={index}
                  className="text-sm text-gray-600 flex items-center gap-2"
                >
                  <span className="inline-block w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
                  {facility.facility_id?.name || "Unknown Facility"}{" "}
                  {facility.facility_id?.unit && (
                    <span className="text-xs text-gray-400">
                      (Unit: {facility.facility_id.unit})
                    </span>
                  )}
                </li>
              ))
            ) : (
              <p className="text-sm text-gray-500">No facilities available.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

CardStudio.defaultProps = {
  title: "Studio Name",
  img: "https://via.placeholder.com/425x249",
  status: "Unavailable",
  price: 0,
  facilities: [],
  onClick: () => {},
};

export default CardStudio;
