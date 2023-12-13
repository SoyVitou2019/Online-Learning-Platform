import { BrowserRouter, Routes, Route} from "react-router-dom";

import { Login } from "./components/LoginPage/Login"
// import { Login } from "../LoginPage/Login";
import { Registration } from "./components/LoginPage/Registration";
import { Forgotpassword } from "./components/LoginPage/ForgotPassword";
import { Changepassword } from "./components/LoginPage/ChangePassword";
import SideBar from "./components/HomePage/SideBar";
import Filter from "./components/HomePage/Filter";



export const Test = () => {
    return (
      <BrowserRouter>
        <header>
          <SideBar />
        </header>
        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/sidebar" element={<SideBar />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/forgotpassword" element={<Forgotpassword />} />
            <Route path="/changepassword" element={<Changepassword />} />
            <Route path="filter" element={<Filter />} />
          </Routes>
        </main>
      </BrowserRouter>
    );
  };
  