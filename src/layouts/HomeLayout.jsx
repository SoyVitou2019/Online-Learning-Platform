import { useState } from "react";
import { NavBar } from "../components/HomePage/NavBar";
import SideBar from "../components/HomePage/SideBar";


export const HomeLayout = ({ children }) => {
    return (
        <>
            <div className="flex flex-col h-screen">
                <NavBar />

                <div className="flex items-stretch overflow-hidden">
                    <SideBar />

                    <div className="px-5 w-full overflow-y-auto">{children}</div>
                </div>
            </div>
        </>
    );
};
