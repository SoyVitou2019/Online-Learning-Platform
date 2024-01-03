import { useRoutes } from "react-router-dom";

import { publicRoutes, commonRoutes } from "./public";
import { adminRoutes, contentCreatorRoutes, protectedRoutes } from "./private";
import { useAuth } from "../features/auth/api/Auth";

export const AppRoutes = () => {
  // const auth = useAuth();

  const { user, role } = useAuth();

  let routes;

  console.log(user);
  if (user) {
    if (role === "admin") {
      routes = adminRoutes;
    } else if (role === "content_creator") {
      routes = contentCreatorRoutes;
    } else {
      routes = protectedRoutes;
    }
  } else {
    routes = publicRoutes;
  }

  const element = useRoutes([...routes, ...commonRoutes]);
  return <>{element}</>;
};

// export const AppRoutes = () => {
//     const routes = publicRoutes;

//     const element = useRoutes([...routes]);

//     return <>{element}</>;
// };
