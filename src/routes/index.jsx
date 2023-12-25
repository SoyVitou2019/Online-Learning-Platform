import { useRoutes } from "react-router-dom";

import { publicRoutes } from "./public";
import { protectedRoutes } from "./private";

export const AppRoutes = () => {
  // const auth = useAuth();

  // const commonRoutes = [{ path: '/', element: <Landing /> }];

  //const routes = false ? protectedRoutes : publicRoutes;
  const routes = protectedRoutes;
  const element = useRoutes([...routes, ...publicRoutes]);
  return <h1>{element}</h1>;
};

// export const AppRoutes = () => {
//     const routes = publicRoutes;

//     const element = useRoutes([...routes]);

//     return <>{element}</>;
// };
