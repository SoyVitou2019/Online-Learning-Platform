import { Route, Routes } from "react-router-dom";

import UploadPage from "./UploadPage";

export const ProfileRoutes = () => {
  return (
    <Routes>
      <Route path="upload" element={<UploadPage />} />
    </Routes>
  );
};
