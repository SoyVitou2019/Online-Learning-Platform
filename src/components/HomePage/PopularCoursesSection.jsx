import { CardPortrait } from "./CardPortrait";
import { Link } from "react-router-dom";

export const PopularCoursesSection = () => {
  return (
    <div>
      <h1 className="text-center my-8 text-4xl font-bold tracking-tight leading-none dark:text-dark">
        Popular Courses
      </h1>
      <div className="flex gap-5 justify-center space-x-12 px-12 py-3">
        <div className="max-w-[400px]">
          <CardPortrait
            showDetail={true}
            title="Python 2023"
            desc="welcome to my course"
            author="Koungmeng"
            category="Math"
          />
        </div>
        <div className="max-w-[400px]">
          <CardPortrait
            showDetail={true}
            title="Python 2023"
            desc="welcome to my course"
            author="Koungmeng"
            category="Math"
          />
        </div>

        <div className="max-w-[400px]">
          <CardPortrait
            showDetail={true}
            title="Python 2023"
            desc="welcome to my course"
            author="Koungmeng"
            category="Math"
          />
        </div>
      </div>
      <div className="my-8 flex justify-center items-center">
        <Link
          to="#"
          className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Show more
        </Link>
      </div>
    </div>
  );
};
