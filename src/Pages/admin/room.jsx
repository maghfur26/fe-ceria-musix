import CardAdmin from "../../Components/elements/CardAdmin";
import Admin from "./admin";

const RoomPages = () => {
  return (
    <Admin>
      <CardAdmin
        title={"Daftar Studio"}
        url={"https://ceriamusicapi-production.up.railway.app/api/room"}
      />
    </Admin>
  );
};

export default RoomPages;
