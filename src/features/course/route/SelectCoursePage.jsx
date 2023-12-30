import { SelectCourse } from "../components/SelectCourse";
import { useParams } from "react-router-dom";
const SelectCoursePage = () => {
  let { course_id } = useParams();
  return <SelectCourse course_id={course_id} />;
};
export default SelectCoursePage;
