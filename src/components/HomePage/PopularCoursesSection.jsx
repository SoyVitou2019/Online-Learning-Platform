import { CardPortrait } from "./CardPortrait";

export const PopularCoursesSection = () => {
  return (
    <div>
      <h1 className="text-center my-8 text-4xl font-bold tracking-tight leading-none dark:text-dark">
        Popular Courses
      </h1>
      <div className="mt-10 flex flex-wrap justify-center space-x-12">
        <CardPortrait showDetail={false} />
        <CardPortrait showDetail={false} />
        <CardPortrait showDetail={false} />
      </div>
      <div className="my-8 flex justify-center items-center">
        <a
          href="#"
          className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Show more
        </a>
      </div>
    </div>
  );
};
