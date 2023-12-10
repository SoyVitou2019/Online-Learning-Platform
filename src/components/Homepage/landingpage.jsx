import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Login } from "../LoginPage/Login";
import { Registration } from "../LoginPage/Registration";
import { Forgotpassword } from "../LoginPage/ForgotPassword";
import { Changepassword } from "../LoginPage/ChangePassword";

export const LandingPage = () => {
  return (
    <BrowserRouter>
      <header>
        <nav className="flex justify-center gap-5 m-10 ">
          <Link to="/login" className="hover:text-zinc-600">
            Login
          </Link>
          <Link to="/registration" className="hover:text-zinc-600">
            Registration
          </Link>
        </nav>
      </header>
      <main className="flex justify-center">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
          <Route path="/changepassword" element={<Changepassword />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};
