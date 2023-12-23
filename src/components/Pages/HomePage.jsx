import HomePageFilter from "../HomePage/HomePageFilter";
import { NavBar } from "../HomePage/NavBar";
import SideBar from "../HomePage/SideBar";
import HorizontalLine from "../HomePage/HorizontalLine";

export const HomePage = () => {
  return (
    <>
      <div className="mb-3">
        <NavBar />
      </div>

      <div className="flex">
        <SideBar />

        <div className="ml-3 w-full">
          <HomePageFilter />
          <h1 className="mt-3 text-2xl font-bold">Popular</h1>
          <hr />
        </div>
      </div>
    </>
  );
};
