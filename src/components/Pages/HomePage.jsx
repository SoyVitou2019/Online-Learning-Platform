import { CardPortrait } from "../HomePage/CardPortrait";
import HomePageFilter from "../HomePage/HomePageFilter";
import { NavBar } from "../HomePage/NavBar";
import SideBar from "../HomePage/SideBar";

export const HomePage = () => {
    return (
        <>
            <div className="mb-3">
                <NavBar />
            </div>

            <div className="flex justify-stretch">
                <SideBar />

                <div className="mx-5 w-full">
                    <HomePageFilter />
                    <h1 className=" text-2xl font-bold m-2">Popular</h1>
                    <hr />
                    <div className="grid grid-cols-3 p-5 gap-4">
                        <CardPortrait />
                        <CardPortrait />
                        <CardPortrait />

                        <CardPortrait />

                        <CardPortrait />

                        <CardPortrait />
                    </div>
                    <h1 className=" text-2xl font-bold m-2">News</h1>
                    <hr />
                    <div className="grid grid-cols-3 p-5 gap-4">
                        <CardPortrait />
                        <CardPortrait />
                        <CardPortrait />
                        <CardPortrait />
                        <CardPortrait />
                        <CardPortrait />
                    </div>
                </div>
            </div>
        </>
    );
};
