import { Link } from 'react-router-dom';

export const Registration = () => {
    return (
        <form className = "login-style">
            <p className="border-button text-center p-5">Sign Up</p>
            <label htmlFor="fname"></label>
            <input className="border-button mt-9 pl-[5px] mr-10 ml-10 outline-none" type="text" id="fname" placeholder="First Name"/>
            <label htmlFor="lname"></label>
            <input className="border-button mt-4 pl-[5px] mr-10 ml-10 outline-none" type="text" id="lname" placeholder="Last Name"/>
            <label htmlFor="email"></label>
            <input className="border-button mt-4 pl-[5px] mr-10 ml-10 outline-none"  type="email" id="email" placeholder="Youremailaddress@gmail.com"/>
            <label htmlFor="pwd"></label>
            <input className="border-button mt-4 pl-[5px] mr-10 ml-10 outline-none" type="password" id="pwd" placeholder="Password"/>
            <label htmlFor="confirmpwd"></label>
            <input className="border-button mt-4 pl-[5px] mr-10 ml-10 outline-none" type="password" id="confirmpwd" placeholder="Confirm Password"/>
            <div className="flex mt-6 justify-center">
                <p>Already login?</p>
                <Link to="/Login" className=" font-bold ml-1 hover:text-stone-400">Log In</Link>
            </div>
            <button className="border-2 border-black rounded-lg p-2 m-7 hover:bg-slate-300"> Sign Up </button>
        </form>
    )
}