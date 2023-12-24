import { Link } from "react-router-dom";
const HomePageFilter = () => {
  return (
    <div className="flex items-start">
      <Link to="/" className="p-2 mx-2 mt-3 text-l bg-slate-500 ">
        C++
      </Link>

      <Link to="/" className="p-2 mx-2 mt-3 text-l bg-slate-500 ">
        Math
      </Link>

      <Link to="/" className="p-2 mx-2 mt-3 text-l bg-slate-500 ">
        Python
      </Link>
    </div>
  );
};
export default HomePageFilter;
