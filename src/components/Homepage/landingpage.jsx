import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Login } from "../LoginPage/Login";
import { Registration } from "../LoginPage/Registration";
import { Forgotpassword } from "../LoginPage/ForgotPassword";
import { Changepassword } from "../LoginPage/ChangePassword";
import Home from "./Home";

export const LandingPage = () => {
  return (
    <BrowserRouter>
      <header>
        <nav className="flex justify-center gap-5 m-10 ">
          
        </nav>
      </header>
      <main className="flex justify-center">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
          <Route path="/changepassword" element={<Changepassword />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};
