import React, { useEffect } from "react";
import bgLanding from "../../../assets/bg.jpg";
import logo from "../../../assets/logo.png";
import AOS from "aos";

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <section id="about" className="mt-28">
      <div
        className="flex h-[170px] lg:h-[250px] w-[95dvw] rounded-3xl mx-auto justify-center items-center flex-col shadow-black drop-shadow-lg"
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
        <div className="bg-white px-5 lg:px-10 py-5 rounded-3xl flex flex-col md:flex-row justify-center gap-2 w-[70%] lg:w-[1100px]">
          <div className="flex justify-center items-center p-1 rounded-full w-full md:w-[223px] lg:w-[223px] text-2xl lg:text-[30px]">
            <h1 className="text-3xl lg:text-4xl font-manrope">About Us</h1>
          </div>
        </div>
      </div>
      <div
        data-aos="fade-in"
        className="mt-16 text-center text-black-600 text-sm space-y-2 flex flex-col md:flex-row items-center md:justify-between"
      >
        <div className="flex justify-center md:ml-10 md:w-[30%]">
          <img
            src={logo}
            alt="Music Studio"
            className="w-[300px] h-auto md:w-[400px] object-cover rounded-2xl"
          />
        </div>
        <div className="text-left md:w-[60%] mb-6 md:mb- font-manrope">
          <p className="leading-8 md:text-[23px] text-xl px-12 mb-6 md:mb-6">
            Music studio rental is a music studio rental service provider that
            serves daily rentals with different price ranges. Established since
            2022, we always make improvements to customer service to be even
            better.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
