import { Link } from "react-router-dom";
// eslint-disable-next-line react/prop-types
export const CardPortrait = ({
  showDetail,
  title,
  desc,
  author,
  category,
  course_id,
}) => {
  return (
    <div className="w-full bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700">
      <Link to={"/course/" + course_id}>
        <img className="w-full" src="https://fakeimg.pl/1600x900" alt="" />
      </Link>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 line-clamp-1 overflow-ellipsis text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </a>
        <p className="mb-3 line-clamp-1 overflow-ellipsis font-normal text-gray-700 dark:text-gray-400">
          {desc}
        </p>
        {showDetail && (
          <div className="flex justify-between">
            <a
              href="#"
              className=" px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {author}
            </a>
            <a
              href="#"
              className="ml-auto px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {category}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
