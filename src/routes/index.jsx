import { useRoutes } from "react-router-dom";

import { publicRoutes } from "./public";

export const AppRoutes = () => {
  const routes = publicRoutes;

  const element = useRoutes([...routes]);

  return <>{element}</>;
};
