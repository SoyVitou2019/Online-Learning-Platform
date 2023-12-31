import { NavBar } from "./HomePage/NavBar";
import SideBar from "./HomePage/SideBar";

const LayoutHome = ({ children }) => {
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
export default LayoutHome;
