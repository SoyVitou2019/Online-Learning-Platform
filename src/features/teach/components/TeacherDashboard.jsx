import { Link } from "react-router-dom";
const TeacherDashboard = () => {
  return (
    <div className="mb-32">
      <div className="px-5 flex justify-start border-t border-b border-gray-300">
        <Link
          to="/teach/upload"
          className=" p-4 py-2 text-md font-medium text-center"
        >
          Course
        </Link>
        <Link to="/teach/dashboard" className=" p-4  py-2 text-md font-medium ">
          Dashboard
        </Link>
      </div>
      <p className="font-bold pl-9 pt-4 mb-7 ">Course Dashboard</p>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                ID
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Course Name
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Course Category
              </th>

              <th scope="col" className="px-6 py-3 text-center">
                Option
              </th>
            </tr>
          </thead>
          {/* all users */}
          {/* <tbody>
            {allusers.map((item, index) => (
              <tr className="bg-white border-b " key={index}>
                <th scope="row" className="px-6 py-4 font-medium text-black">
                  {item.userId}
                </th>
                <td className="px-3 py-4 ">
                  <img
                    className="w-12 h-12 object-cover"
                    src={item.userProfile}
                    alt="Description of the image"
                  />
                </td>
                <td className="px-6 py-4">{item.fullName}</td>
                <td className="px-6 py-4">{item.created_at}</td>
                <td className="px-6 py-4">{item.role}</td>
                <td className="px-6 py-4">
                  <div
                    className="flex gap-7"
                    onClick={() => {
                      openDeleteUserModal(item.userId);
                    }}
                  >
                    <i className="bi bi-trash bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg"></i>
                  </div>
                </td>
              </tr>
            ))}
          </tbody> */}
          {/* user requested */}
        </table>
      </div>
    </div>
  );
};
export default TeacherDashboard;
