import React, { useEffect } from "react";
import bgLanding from "../../../assets/bgLandingPages.jpg";
import AOS from "aos";

const HeroSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true, 
    });
  }, []);
   
  return (
    <section className="relative py-10 flex flex-col items-center">
      <div className="relative w-[90%] max-w-6xl" data-aos="fade-up">
        <div className="overflow-hidden rounded-lg" data-aos="zoom-in">
          <img
            src={bgLanding}
            alt="Music Studio"
            className="w-[1200px] h-[300px] md:h-[400px] rounded-2xl object-cover"
          />
        </div>

        <div
          className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 w-[80%] bg-white shadow-lg rounded-xl p-3 lg:p-10 md:p-8 text-center"
        >
          <h1 className="md:text-5xl text-xl lg:text-[60px]  font-normal md:mb-8 lg:mb-5">
            Discover Your dream
          </h1>
          <span className="md:text-5xl text-xl lg:text-[60px] font-normal">
            Music Studio with us!
          </span>
        </div>
      </div>

      <div
        data-aos="fade-in"
        className="mt-16 text-center text-gray-600 text-sm space-y-2"
      >
        <div className="mb-10">
          <p className="md:text-[23px] text-[15px] px-12 font-normal text-[#2E343F] mb-6 md:mb-6 md:leading-6">
            Are you a musician, producer, or content creator looking for <br className="hidden lg:block"/>{" "}
            the perfect space to bring your creative visions to life? Look no{" "}
            <br className="hidden lg:block" /> further.
          </p>
          <button className="md:w-[170px] md:h-[45px] w-[120px] md:text-[20px] h-[40px] bg-blue-500 text-white font-semibold md:text-xl rounded-full hover:bg-blue-600 transition">
            Explore More
          </button>
        </div>

        <div
          data-aos="fade-up"
          className="md:flex flex-col px-7 md:flex-row md:gap-9 gap-4 items-center md:items-start text-gray-600"
        >
          <div className="flex justify-between w-full md:w-auto items-center md:mt-5">
            <span className="text-[16px] text-[#2E343F] md:ml-16 md:text-[20px] md:block lg:block hidden font-normal" data-aos='fade-right'>
              Excellent 10,000+ reviews
            </span>
            <p className="text-[16px] md:text-[20px] hidden lg:block font-normal md:block text-[#2E343F] md:ml-36 text-center" data-aos='fade-left'>
              People Have Successfully <br /> Found Their Dream Studio
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
