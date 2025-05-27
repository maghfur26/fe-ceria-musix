import React, { useEffect } from "react";
import bgLanding from "../../../assets/bg.jpg";
import logo from "../../../assets/logo.png";
import AOS from "aos";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";

const Contact = () => {
  return (
    <section id="contact" className="pt-10">
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
            <h1 className="text-3xl lg:text-4xl font-manrope">Contact</h1>
          </div>
        </div>
      </div>
      <div
        data-aos="fade-in"
        className="mt-10 text-black-600 text-sm space-y-2 flex flex-col md:flex-row items-center md:justify-between px-10"
      >
        <div className="font-semibold lg:text-xl flex flex-col gap-4 font-manrope">
          <div className="w-[223px] flex">
            <InstagramIcon />
            <span>Instagram:@musicstudiorental</span>
          </div>
          <div className="w-[223px] flex">
            <WhatsAppIcon />
            <span>WhatsApp:081238723641</span>
          </div>
          <div className="w-[223px] flex">
            <FacebookIcon />
            <span>Facebook:musicstudiorental</span>
          </div>
        </div>
        <div className="lg:text-xl flex flex-col font-manrope">
          <h1 className="font-semibold">Rental Studio Music Office</h1>
          <p>Office 3a-4</p>
          <p>Ruffold Gate Complex</p>
          <p>Jakarta</p>
          <p>Musicstudiorental@gmail.com</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
