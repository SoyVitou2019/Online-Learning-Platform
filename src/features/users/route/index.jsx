import { useRoutes } from "react-router-dom";
import { UpdateProfile, ViewProfile } from "../components"


const userRoute = [

    {
        name: "/update",
        element: <UpdateProfile />
    },

    {
        name: "/view",
        element: <UpdateProfile />
    },

    {
        name: "/update",
        element: <UpdateProfile />
    }

]

const UserRoute = () => {
    const element = useRoutes([...userRoute]);
    return { element }


}
export default UserRoute;
