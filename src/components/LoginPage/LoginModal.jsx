import React, { useState, useEffect } from "react";
import axios from 'axios'
import Cookies from 'universal-cookie';

// import { decode } from "jsonwebtoken";

const LoginModal = ({ closeLoginModal }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);
    const [CheckValidate, setCheckValidate] = useState(true);

    const cookies = new Cookies();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }


    useEffect(() => {
        fetch('http://localhost:3000/users')
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const handleLogin = async () => {
        try {
            console.log(email, password)
            const response = await axios.post('http://localhost:3000/login', {
                email,
                password,
            });
            console.log(response.data)
            const jwt_token = response.data
            cookies.set('jwt-decode', jwt_token, {path: '/'})
            const return_jwt_token = document.cookie.split('=')[1]
            console.log(return_jwt_token)
            closeLoginModal();
        } catch (error) {
            setCheckValidate(false)
            console.error('Login failed:');
        }

    }



    const [isResetModalOpen, setResetModalOpen] = useState(false);
    const openResetModal = () => {
        setResetModalOpen(true)
    }
    const closeResetModal = () => {
        setResetModalOpen(false)
    }



    return (
        <>
            <section className={`fixed ${isResetModalOpen ? 'hidden' : ''} top-0 left-0 w-full h-full items-center justify-center`}>
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <div className="flex gap-20">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Login to your account
                                </h1>
                                <button type="button" onClick={closeLoginModal} className={`end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white`} data-modal-hide="authentication-modal">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <form className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" value={email} onChange={handleEmailChange} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                    <p className={`${CheckValidate ? 'hidden' : 'flex'} text-red-500 justify-start`}>Email may incorrect!</p>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" value={password} onChange={handlePasswordChange} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                    <div className="flex justify-between">
                                        <p className={`${CheckValidate ? 'hidden' : 'flex'} text-red-500 justify-start`}>Password may incorrect!</p>
                                        <label className=" flex justify-end    text-green-500 font-extrabold dark:text-gray-300"><a onClick={openResetModal} className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Forget password?</a></label>

                                    </div>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <div className="flex items-center h-5">
                                        <input id="terms" aria-describedby="terms" type="CheckValidatebox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                    </div>
                                    <div className="text-sm">
                                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                                    </div>
                                </div>
                                <button type="submit" onClick={handleLogin} className="w-full text-white bg-slate-500 hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    New user? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            {isResetModalOpen ? <ResetnewPassword closeResetModal={closeResetModal} /> : ''}

        </>
    )
}

export default LoginModal;
