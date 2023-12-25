import { HomeRoutes } from "../features/homepage/route";
import { ProfileRoutes } from "../features/profile/route";

export const publicRoutes = [
  {
    path: "/*",
    element: <HomeRoutes />,
  },
  {
    path: "/profile",
    element: <ProfileRoutes />,
  },
];
