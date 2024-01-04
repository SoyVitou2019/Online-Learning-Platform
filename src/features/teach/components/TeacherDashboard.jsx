const TeacherDashboard = () => {
  return <div className="mb-32">
  {/* header */}
  <div className="px-5 flex justify-start border-t border-b border-gray-300">
    <Link
      to="/teacher/upload"
      className=" p-4 py-2 text-md font-medium text-center"
    >
      Course
    </Link>
    <Link to="/teach/dashboard" className=" p-4  py-2 text-md font-medium ">
      Dashboard
    </Link>
    <button
      className=" p-4  py-2 text-md font-medium ml-auto bg-green-200 "
      onClick={handleSubmit}
    >
      Publish
    </button>
  </div>
  <p className="font-bold pl-9 pt-4 ">Upload Videos</p>;
};
export default TeacherDashboard;
