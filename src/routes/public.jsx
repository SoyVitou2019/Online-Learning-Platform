import { HomeRoutes } from "../features/homepage/route";
import { LandingPage } from "../features/landing/route/LandingPage";
import { ProfileRoutes } from "../features/profile/route";

export const publicRoutes = [
  {
    path: "/landing",
    element: <LandingPage />,
  },
  {
    path: "/*",
    element: <HomeRoutes />,
  },
  {
    path: "/profile",
    element: <ProfileRoutes />,
  },
];
