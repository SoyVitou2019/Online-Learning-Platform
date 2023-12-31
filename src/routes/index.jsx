import { useRoutes } from "react-router-dom";

import { publicRoutes, commonRoutes } from "./public";
import { protectedRoutes } from "./private";
import { useAuth } from "../features/auth/api/Auth";

export const AppRoutes = () => {
    // const auth = useAuth();

    const { user } = useAuth();

    //const routes = false ? protectedRoutes : publicRoutes;
    const routes = user ? protectedRoutes : publicRoutes;
    const element = useRoutes([...routes, ...commonRoutes]);
    return <>{element}</>;
};

// export const AppRoutes = () => {
//     const routes = publicRoutes;

//     const element = useRoutes([...routes]);

//     return <>{element}</>;
// };
