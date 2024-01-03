import { useRoutes } from "react-router-dom";
import { UpdateProfile, ViewProfile } from "../components"
import { HomeLayout } from "../../../layouts";

export const userRoute = [
    {
        path: "", element: <ViewProfile />
    },
    {
        path: "update",
        element: <UpdateProfile />
    },

    {
        path: "view",
        element: <ViewProfile />
    },

    {
        path: "gugu",
        element: <UpdateProfile />
    }

]

export const UserProfileRoute = () => {
    const element = useRoutes([...userRoute]);
    return (
        <div>
            {element}
        </div>
    )
}
