import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Login } from '../(login-pages)/login';
import { Registration } from '../(login-pages)/registration';
import { Forgotpassword } from '../(login-pages)/forgotpassword';
import { Changepassword } from '../(login-pages)/changepassword';



export const Homepage = () => {
    return (
        <BrowserRouter>
            <header>
            <nav className="flex justify-center gap-5 m-10 ">
                <Link to="/login" className="hover:text-zinc-600">Login</Link>
                <Link to="/registration" className="hover:text-zinc-600">Registration</Link>
            </nav>
            </header>
            <main className = "flex justify-center">
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/registration' element={<Registration />} />
                <Route path='/forgotpassword' element={<Forgotpassword />} />
                <Route path='/changepassword' element={<Changepassword />} />
            </Routes>
            </main>
        </BrowserRouter>
    )
}