import { HomeRoutes } from "../features/homepage/route";

export const publicRoutes = [
  {
    path: "/*",
    element: <HomeRoutes />,
  },
];
