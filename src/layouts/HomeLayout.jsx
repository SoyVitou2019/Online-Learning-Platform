import { NavBar } from "../components/HomePage/NavBar";
import SideBar from "../components/HomePage/SideBar";

export const HomeLayout = ({
    children
}) => {
    return (
        <>
            <div className="mb-3">
                <NavBar />
            </div>

            <div className="flex justify-stretch max-h-[100vh]">
                <SideBar />

                <div className="mx-5 w-full overflow-y-scroll">
                    {children}
                </div>
            </div>
        </>
    );
};

