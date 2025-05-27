import { CiCircleChevUp, CiTwitter } from "react-icons/ci";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import maghfur from "../../../assets/teams/maghfur.jpg";
import alif_fadillah from "../../../assets/teams/alif_fadillah.jpg";
import rendy from "../../../assets/teams/rendy.jpg";
import bella from "../../../assets/teams/bella.jpg";
import Reza from "../../../assets/teams/Reza.jpg";

const Team = () => {
    const cards = [
        {
            id: 1,
            img: `${maghfur}`,
            work: "Fullstack Developer",
            name: "Maghfur Hasani",
        },
        {
            id: 2,
            img: `${alif_fadillah}`,
            work: "Backend Developer",
            name: "Alif Fadillah Ummar",
        },
        {
            id: 3,
            img: `${rendy}`,
            work: "Backend Developer",
            name: "Alif Rendy Pahlevi",
        },
        {
            id: 4,
            img: `${bella}`,
            work: "UI/UX",
            name: "Salsabila",
        },
        {
            id: 5,
            img: `${Reza}`,
            work: "Frontend Developer",
            name: "Reza Rafli Fahlendi",
        },
    ];

    return (
        <div className="py-10 font-['Poppins']" id="team">
            <div className="container mx-auto">
                <h1 className="text-4xl font-bold flex justify-center font-['Poppins']">
                    Our Team
                </h1>
                <div className="flex flex-row flex-wrap justify-center gap-3 py-10 px-5 md:justify-between">
                    {cards.map((card) => (
                        <div
                            key={card.id}
                            className="flex flex-col items-center relative rounded-xl"
                        >
                            <div className="relative card">
                                <img
                                    src={card.img}
                                    alt={card.name}
                                    className="w-80 h-64 bg-[#DEDEDE] aspect-4/3 object-cover object-center rounded-[10px] shadow-sm shadow-black"
                                />
                            </div>
                            <p className="text-2xl font-semibold text-black py-2">
                                {card.name}
                            </p>
                            <p>{card.work}</p>
                            <div className="flex flex-row gap-5 p-3 text-xl">
                                <FaFacebook className="text-orange-500" />
                                <CiTwitter />
                                <FaLinkedin />
                                <CiCircleChevUp />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Team;
