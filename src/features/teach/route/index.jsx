import { Route, Routes } from "react-router-dom";

import UploadPage from "./UploadPage";
import RequestPage from "./RequestPage";
import NewUpload from "../components/NewUpload";

export const TeachRoutes = () => {
  return (
    <Routes>
      {/* <Route path="upload" element={<UploadPage />} /> */}
      <Route path="upload" element={<NewUpload />} />
      <Route path="request" element={<RequestPage />} />
    </Routes>
  );
};
