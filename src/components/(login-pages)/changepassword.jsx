import { Link } from 'react-router-dom';

export const Changepassword = () => {
    return (
        <form class = "login-style">
            <p class="border-button text-center p-5">Change Your Password</p>
            <label for="validationcode"></label>
            <input class="border-button mt-4 pl-[5px] mr-10 ml-10 outline-none"  type="password" id="validationcode" placeholder="Validation code"/>
            <label for="newpassword"></label>
            <input class="border-button mt-4 pl-[5px] mr-10 ml-10 outline-none"  type="password" id="newpassword" placeholder="New password"/>
            <label for="verifypassword"></label>
            <input class="border-button mt-4 pl-[5px] mr-10 ml-10 outline-none"  type="password" id="verifypassword" placeholder="Verify password"/>
            <button class="border-2 border-green-500 rounded-lg p-2 mr-7 ml-7 mt-7 hover:bg-green-300"> Change Password </button>
            <Link to="/login" class="text-green-600 font-bold mb-10 ml-32 hover:text-green-500">Return to Login Page</Link>
        </form>
    )
}