import { useRoutes } from "react-router-dom";

import { publicRoutes } from "./public";
import { protectedRoutes } from "./private";
import { useAuth } from "../features/auth/api/Auth";
import { Navigate } from "react-router-dom";

export const AppRoutes = () => {
  // const auth = useAuth();

  const { user } = useAuth();

  // const commonRoutes = [{ path: '/', element: <Landing /> }];

  //const routes = false ? protectedRoutes : publicRoutes;
  const routes = user ? protectedRoutes : publicRoutes;
  const element = useRoutes([...routes, ...publicRoutes]);
  return <>{element}</>;
};

// export const AppRoutes = () => {
//     const routes = publicRoutes;

//     const element = useRoutes([...routes]);

//     return <>{element}</>;
// };
