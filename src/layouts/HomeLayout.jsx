import { NavBar } from "../components/HomePage/NavBar";
import SideBar from "../components/HomePage/SideBar";

export const HomeLayout = ({ children }) => {
  return (
    <div className="max-h-screen flex-col">
      <div className="flex-1">
        <NavBar />
      </div>

      <div className="flex">
        <SideBar />

        <div className="mx-5 w-full overflow-y-scroll">{children}</div>
      </div>
    </div>
  );
};
