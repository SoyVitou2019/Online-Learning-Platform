import { Route, Routes } from "react-router-dom";

import SelectCoursePage from "./SelectCoursePage";
import PlayCourse from "../components/PlayCourse";

export const CourseRoutes = () => {
  return (
    <Routes>
      {/* <Route path="" element={<SelectCoursePage />} /> */}
      <Route path="/:course_id" element={<SelectCoursePage />} />
      <Route path="/:course_id/index/:index" element={<PlayCourse />} />
    </Routes>
  );
};
