import { Link } from 'react-router-dom';

export const Login = () => {
    return (
        <form className = "login-style">
            <p className="border-button text-center p-5">Login</p>
            <label htmlFor="email"></label>
            <input className="border-button mt-4 pl-[5px] mr-10 ml-10 outline-none"  type="email" id="email" placeholder="Youremailaddress@gmail.com"/>
            <label htmlFor="pwd"></label>
            <input className="border-button mt-4 pl-[5px] mr-10 ml-10 outline-none" type="password" id="pwd" placeholder="Password"/>
            <div className="flex mt-6 justify-center">
                <Link to="/forgotpassword" className=" font-bold ml-1 hover:text-stone-600">Forget password</Link>
            </div>
            <button className="border-2 border-black rounded-lg p-2 m-7 hover:bg-slate-300"> Login </button>
            
            <div className="flex mb-6 justify-center">
                <p>Not a member?</p>
                <Link to="/registration" className=" font-bold ml-1 hover:text-stone-600">Sign Up</Link>
            </div>
        </form>
    )
}