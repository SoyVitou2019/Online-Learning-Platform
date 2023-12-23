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

      <div className="flex">
        <SideBar />

        <div className="mx-5 w-full">
          <HomePageFilter />
          <h1 className=" text-2xl font-bold">Popular</h1>
          <hr />
          <div className="grid grid-cols-4 p-5 gap-4">
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
