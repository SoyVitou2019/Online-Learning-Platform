import { Route, Routes } from "react-router-dom";

import UploadPage from "./UploadPage";
import RequestPage from "./RequestPage";

export const TeachRoutes = () => {
  return (
    <Routes>
      <Route path="upload" element={<UploadPage />} />
      <Route path="request" element={<RequestPage />} />
    </Routes>
  );
};
