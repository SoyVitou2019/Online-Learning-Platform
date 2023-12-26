import { Route, Routes } from "react-router-dom";

import SelectCoursePage from "./SelectCoursePage";

export const CourseRoutes = () => {
  return (
    <Routes>
      {/* <Route path="" element={<SelectCoursePage />} /> */}
      <Route path="/:userId" element={<SelectCoursePage />} />
    </Routes>
  );
};
