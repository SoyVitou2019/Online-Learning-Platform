import { Route, Routes } from "react-router-dom";

import HomePage from "./HomePage";
import HomePageFollow from "../components/HomePageFollow";

export const HomeRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<HomePage />} />
      <Route path="course_follow" element={<HomePageFollow />} />
    </Routes>
  );
};
