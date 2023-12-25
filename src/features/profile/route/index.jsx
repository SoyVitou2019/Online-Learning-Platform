import { Route, Routes } from "react-router-dom";

import ProfilePage from "./ProfilePage";

export const ProfileRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<ProfilePage />} />
    </Routes>
  );
};
