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
import ResetPasswordPage from "../features/auth/route/ResetPasswordPage";

export const publicRoutes = [
  {
    path: "/",
    element: <LandingPage />,
  },

  {
    path: "/auth/*",
    element: <AuthRoutes />,
  },
];

export const commonRoutes = [
  {
    path: "/contact-us",
    element: <ContactUsPage />,
  },

  {
    path: "/donate",
    element: <DonatePage />,
  },
  {
    path: "*",
    element: <RouteError />,
  },
];
