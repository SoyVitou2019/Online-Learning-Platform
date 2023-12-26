import AdminPage from "../features/admin/route/AdminPage";
import { HomeRoutes } from "../features/homepage/route";
import { LandingPage } from "../features/landing/route/LandingPage";
import { ProfileRoutes } from "../features/profile/route";
import UploadPage from "../features/teach/route/UploadPage";

export const publicRoutes = [
  {
    path: "/landing",
    element: <LandingPage />,
  },
];
