import { NavBar } from "./HomePage/NavBar";
import SideBar from "./HomePage/SideBar";

const LayoutHome = ({ children }) => {
  return (
    <>
      <div className="mb-3">
        <NavBar />
      </div>

      <div className="flex justify-stretch">
        <SideBar />

        <div className="mx-5 w-full">{children}</div>
      </div>
    </>
  );
};
export default LayoutHome;
