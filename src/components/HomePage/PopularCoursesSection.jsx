import { CardPortrait } from "./CardPortrait";
import { Link } from "react-router-dom";

export const PopularCoursesSection = () => {
    return (
        <div className="h-[85vh] flex justify-center items-center">
            <div>
                <h1 className="text-center mb-16 text-4xl font-bold text-black tracking-tight leading-none ">
                    Popular Courses
                </h1>
                <div className="flex gap-5 justify-center space-x-12 px-12 py-3">
                    <div className="max-w-[400px]">
                        <div className="w-full bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700">
                            <Link to="/auth/login">
                                <img
                                    className="w-full"
                                    src={`https://img.youtube.com/vi/qB_YpJzwJQ8/mqdefault.jpg`}
                                    alt=""
                                />
                            </Link>
                            <div className="p-5">
                                <Link>
                                    <h5 className="mb-2 line-clamp-1 overflow-ellipsis text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        ផ្ចិតឆ្លុះនៃក្រាប
                                    </h5>
                                </Link>
                                <p className="mb-3 line-clamp-1 overflow-ellipsis font-normal text-gray-700 dark:text-gray-400">
                                    សូមអភ័យទោសរាល់កំហុសខុសឆ្គងទាំងឡាយណាក្នុងវីដេអូ សូមអរគុណ។
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="max-w-[400px]">
                        <div className="w-full bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700">
                            <Link to="/auth/login">
                                <img
                                    className="w-full"
                                    src={`https://img.youtube.com/vi/6OiCI4LPc7Y/mqdefault.jpg`}
                                    alt=""
                                />
                            </Link>
                            <div className="p-5">
                                <Link>
                                    <h5 className="mb-2 line-clamp-1 overflow-ellipsis text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        បន្ទាត់ប៉ះរង្វង់ | គណិតវិទ្យាទី៩
                                    </h5>
                                </Link>
                                <p className="mb-3 line-clamp-1 overflow-ellipsis font-normal text-gray-700 dark:text-gray-400">
                                    សូមអភ័យទោសរាល់កំហុសខុសឆ្គងទាំងឡាយណាក្នុងវីដេអូ សូមអរគុណ។
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-[400px]">
                        <div className="w-full bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700">
                            <Link to="/auth/login">
                                <img
                                    className="w-full"
                                    src={`https://img.youtube.com/vi/8jZzSSdHpIM/mqdefault.jpg`}
                                    alt=""
                                />
                            </Link>
                            <div className="p-5">
                                <Link>
                                    <h5 className="mb-2 line-clamp-1 overflow-ellipsis text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        សម្រាយរូបមន្តលីមីត lim ដែល x ខិតជិត0 នៃsinx/x
                                    </h5>
                                </Link>
                                <p className="mb-3 line-clamp-1 overflow-ellipsis font-normal text-gray-700 dark:text-gray-400">
                                    សូមអភ័យទោសរាល់កំហុសខុសឆ្គងទាំងឡាយណាក្នុងវីដេអូ សូមអរគុណ។
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="my-8 flex justify-center items-center">
                    <Link
                        to="/auth/login"
                        className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Show more
                    </Link>
                </div>
            </div>
        </div>
    );
};
