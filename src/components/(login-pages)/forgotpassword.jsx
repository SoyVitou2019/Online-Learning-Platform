import { Link } from 'react-router-dom';

export const Forgotpassword = () => {
    return (
        <form className = "login-style">
            <p className="border-button text-center p-5">Forggot your password?</p>
            <label htmlFor="email"></label>
            <input className="border-button mt-4 pl-[5px] mr-10 ml-10 outline-none"  type="email" id="email" placeholder="Youremailaddress@gmail.com"/>
            <p className="flex mr-6 ml-6 mt-6 mb-2 text-justify">If you have forgotten your password, please
                 enter your account's email address below and
                  click the "Reset My Password" button. You will
                   receive an email that contains a link that 
                   contains a link to set a new password.</p>
            <div className="flex mt-1 mb-3 justify-center">
                <p>Already login?</p>
                <Link to="/login" className="text-green-600 font-bold ml-1 hover:text-green-300">Back</Link>
            </div>
            <Link to="/changepassword" className="border-2 border-red-700 rounded-lg p-2 mr-7 ml-7 mb-9 text-center hover:bg-red-300">Reset my password</Link>
        </form>
    )
}