// import { SelectCourse } from "../components/SelectCourse";
import { useParams } from "react-router-dom";
const SelectCoursePage = () => {
  let { userId } = useParams();
  return <h1>{userId}</h1>;
};
export default SelectCoursePage;
