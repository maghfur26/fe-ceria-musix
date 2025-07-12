import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

const Card = ({ ...props }) => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="600"
      data-aos-delay="200"
      className={`${props.className} p-6 flex flex-col items-center w-full md:w-[325px] lg:w-[425px] h-[269px]`}
    >
      <header className="font-manrope text-2xl mb-4 text-center">
        <h1>{props.title}</h1>
      </header>
      <main onClick={props.onClick}>
        <img
          src={props.img}
          alt="Studio"
          className="h-[200px] w-[325px] lg:w-[425px] lg:h-[249px] rounded-3xl hover:scale-110 transition-all ease-in-out duration-300 cursor-pointer hover:shadow-2xl"
        />
        <div className="flex w-full justify-between my-4">
          <div className="flex items-center">
            <p className="px-4 py-2 rounded-full text-sm bg-blue-500 text-white">
              {props.status}
            </p>
            <p className="px-4 py-2 text-sm">{props.price} / hour</p>
          </div>
          <button className="hover:text-sky-600 transition-colors duration-300 mr-4">
            <BookmarkBorderIcon />
          </button>
        </div>
      </main>
    </div>
  );
};

export default Card;
