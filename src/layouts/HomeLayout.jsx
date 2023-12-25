import { useState } from "react";
import { NavBar } from "../components/HomePage/NavBar";
import SideBar from "../components/HomePage/SideBar";

// <div className="inset-y-0 overflow-x-hidden flex overflow-y-auto hidden sm:block top-[100px] z-10 flex-shrink-0 ">
export const HomeLayout = ({
    children
}) => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <>

            <div className="">
                <div className="sticky top-0 z-10 ">
                    <NavBar />
                </div>
                <div className="flex flex-1 overflow-hidden max-h-screen">

                    <div className="h-full fixed z-20">
                        <SideBar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

                    </div>
                    <div className="mx-5 mt-10 -z-1 w-full flex justify-center ">
                        <div className={`pl-80 ${isSidebarOpen ? "hidden" : ""}`}></div>
                        <div>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

