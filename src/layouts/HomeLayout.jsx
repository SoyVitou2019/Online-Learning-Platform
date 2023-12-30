import SideBar from "../components/SideBar";
import { NavBar } from "../components/NavBar";

export const HomeLayout = ({ children }) => {
    return (
        <>
            <div>
                <NavBar />
            </div>

            <div className="flex justify-start">
                <div className="sticky">
                    <SideBar />
                </div>
                <div className="mx-5 w-full">{children}</div>
            </div>
        </>
    );
};
