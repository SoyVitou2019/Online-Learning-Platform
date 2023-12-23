import LoginModal from "../LoginPage/LoginModal";
import RegisterModal from "../LoginPage/RegisterModal";
import { useState } from "react";




export const HeroSection = () => {
  const [isLoginModalOpen, setLoginModelOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const openModal = () => {
    setLoginModelOpen(true)
  }
  const closeLoginModal = () => {
    setLoginModelOpen(false)
  }

  const openRegisterModal = () =>{
    setRegisterModalOpen(true)
  }
  const closeRegisterModal = () => {
    setRegisterModalOpen(false)
  }

  return (
    <section className="bg-gray-900">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="hidden lg:mt-0 lg:col-span-4 lg:flex">
          <img src="https://fakeimg.pl/400x400" alt="mockup" />
        </div>
        <div className="ms-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-5xl text-white">
            Ready to Learn or Teach?!
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-2xl dark:text-gray-400">
            Everything is FREE!!!
          </p>
          <a
            onClick={openModal}
            href="#"
            className=" text-emerald-300 mr-3 inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-slate-300 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            Log in
          </a>
          <a
          onClick={openRegisterModal}
            href="#"
            className="text-emerald-300 inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            Sign Up
          </a>
          {isLoginModalOpen && <LoginModal closeLoginModal={closeLoginModal}/>}
          {isRegisterModalOpen && <RegisterModal closeRegisterModal={closeRegisterModal} />}
        </div>
      </div>
    </section>
  );
};
