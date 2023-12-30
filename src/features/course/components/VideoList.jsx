import { Link } from "react-router-dom";
export const VideoList = ({ post_id, course_id, title, index }) => {
  return (
    <Link
      to={"/course/" + course_id + "/index/" + index}
      className="flex items-center bg-green-300"
    >
      <img
        className="w-40 aspect-video"
        src="https://fakeimg.pl/1600x900"
        alt=""
      />
      <div className="flex flex-col flex-grow">
        <h5 className="text-black font-bold ml-4">{title}</h5>
      </div>
      <p className="flex justify-end mr-4">15:22</p>
    </Link>
  );
};
