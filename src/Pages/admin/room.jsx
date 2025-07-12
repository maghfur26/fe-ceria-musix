import CardAdmin from "../../Components/elements/CardAdmin";
import Admin from "./admin";

const RoomPages = () => {
    return (
        <Admin>
            <CardAdmin
                title={"Daftar Studio"}
                url={
                    `${import.meta.env.VITE_BASE_URL}/api/room`
                }
            />
        </Admin>
    );
};

export default RoomPages;
