import { Route, Routes } from "react-router-dom";

import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import ForgotPasswordPage from "./ForgotPasswordPage";

export const AuthRoutes = () => {
  return (
    <Routes>
      {/* <Route path="" element={<SelectCoursePage />} /> */}
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
    </Routes>
  );
};
