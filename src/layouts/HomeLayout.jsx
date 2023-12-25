import { NavBar } from "../components/HomePage/NavBar";
import SideBar from "../components/HomePage/SideBar";

export const HomeLayout = ({
    children
}) => {
    return (
        <>

            <div className="">
                <div className="mb-3 sticky top-0 z-10 h-25">
                    <NavBar />
                </div>
                <div className="flex flex-1 overflow-hidden ">
                    <div className="fixed inset-y-0 overflow-x-hidden overflow-y-auto hidden sm:block top-[100px] z-10">

                        <SideBar />
                    </div>

                    <div className="mx-5 overflow-y-scroll mt-10 -z-1 flex justify-center w-full pl-80">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};


// <div className="overflow-y-scroll shrink-1">

// </div>
