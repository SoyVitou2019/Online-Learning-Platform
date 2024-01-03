import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import END_POINTS from "../../constants/endpoints";

export default function DropDownCategory() {
  const [courses, setCourses] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(END_POINTS.CATEGORY);
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="text-right">
      <Menu
        as="div"
        className="relative inline-block text-left"
        onMouseEnter={() => setMenuOpen(true)}
        onMouseLeave={() => setMenuOpen(false)}
      >
        <div>
          <Menu.Button className="inline-flex w-full justify-center text-xl font-semibold text-gray-800">
            Category
          </Menu.Button>
        </div>
        <Transition
          show={menuOpen}
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            static
            className="z-40 absolute mt-2 w-64 h-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
          >
            {courses.map((course) => (
              <Menu.Item key={course.id}>
                {({ active }) => (
                  <Link
                    to={`/course/${course.id}`}
                    className={`${
                      active ? "bg-gray-100" : ""
                    } block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100`}
                  >
                    {course.title}
                  </Link>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

// import { Menu, Transition } from "@headlessui/react";
// import { Fragment, useState } from "react";

// export default function DropDownCategory() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   return (
//     <div className="text-right">
//       <Menu
//         as="div"
//         className="relative inline-block text-left"
//         onMouseEnter={() => setIsMenuOpen(true)}
//         onMouseLeave={() => setIsMenuOpen(false)}
//       >
//         <div>
//           <Menu.Button className="  inline-flex w-full justify-center  text-xl font-semibold text-gray-800">
//             Category
//           </Menu.Button>
//         </div>
//         <Transition
//           as={Fragment}
//           show={isMenuOpen}
//           enter="transition ease-out duration-100"
//           enterFrom="transform opacity-0 scale-95"
//           enterTo="transform opacity-100 scale-100"
//           leave="transition ease-in duration-75"
//           leaveFrom="transform opacity-100 scale-100"
//           leaveTo="transform opacity-0 scale-95"
//         >
//           <Menu.Items className="absolute mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
//             <div className="px-1 py-1 ">
//               <Menu.Item>
//                 {({ active }) => (
//                   <button
//                     className={`${
//                       active ? "bg-violet-500 text-white" : "text-gray-900"
//                     } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
//                   >
//                     Edit
//                   </button>
//                 )}
//               </Menu.Item>
//             </div>
//           </Menu.Items>
//         </Transition>
//       </Menu>
//     </div>
//   );
// }
