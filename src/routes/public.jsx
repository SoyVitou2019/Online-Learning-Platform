import ContactUs from "../components/ContactUs";
import { ContactUsPage } from "../components/Pages/ContactUsPage";
import { DonatePage } from "../components/Pages/DonatePage";
import RouteError from "../components/RouteError";
import AdminPage from "../features/admin/route/AdminPage";
import { AuthRoutes } from "../features/auth/route";
import { HomeRoutes } from "../features/homepage/route";
import { LandingPage } from "../features/landing/route/LandingPage";
import { ProfileRoutes } from "../features/profile/route";
import UploadPage from "../features/teach/route/UploadPage";

export const publicRoutes = [
  {
    path: "/landing",
    element: <LandingPage />,
  },

  {
    path: "/contact-us",
    element: <ContactUsPage />,
  },

  {
    path: "/donate",
    element: <DonatePage />,
  },

  {
    path: "/auth/*",
    element: <AuthRoutes />,
  },
  {
    path: "*",
    element: <RouteError />,
  },
];
