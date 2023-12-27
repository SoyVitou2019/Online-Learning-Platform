import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from '@headlessui/react'

const RegisterModal = ({ closeRegisterModal, isOpen, setIsOpen }) => {
  const [users, setUsers] = useState([]);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profileUrl, setProfileUrl] = useState('');
  const [recovery, setRecovery] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  //  fetch data user
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

  // Handle form submission
  const handleSubmit = () => {-
    // Add your logic for form submission here
    console.log({
      firstName,
      lastName,
      profileUrl,
      recovery,
      email,
      password,
      confirmPassword})
  };


  return (
    <>
      {/* dialog */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeRegisterModal} >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  {/* add sign up page */}

                  <form>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                      <div>
                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-black">First name</label>
                        <input value={firstName} onChange={(e)=> {setFirstName(e.target.value)}} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="John" required />
                      </div>
                      <div>
                        <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-black">Last name</label>
                        <input value={lastName} onChange={(e)=> {setLastName(e.target.value)}} type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Doe" required />
                      </div>
                      <div>
                        <label htmlFor="profile_url" className="block mb-2 text-sm font-medium text-black">Profile URL ( Link )</label>
                        <input value={profileUrl} onChange={(e)=> {setProfileUrl(e.target.value)}} type="profile_url" id="profile_url" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="flowbite.com" required />
                      </div>
                      <div>
                        <label htmlFor="recovery" className="block mb-2 text-sm font-medium text-black">What's your favorite pet?</label>
                        <input value={recovery} onChange={(e)=> {setRecovery(e.target.value)}} id="recovery" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" placeholder="monkey" required />
                      </div>
                    </div>
                    <div className="mb-6">
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-black">Email address</label>
                      <input value={email} onChange={(e)=> {setEmail(e.target.value)}} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" placeholder="john.doe@company.com" required />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-black">Password</label>
                      <input value={password} onChange={(e)=> {setPassword(e.target.value)}} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" placeholder="•••••••••" required />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-black">Confirm password</label>
                      <input value={confirmPassword} onChange={(e)=> {setConfirmPassword(e.target.value)}} type="password" id="confirm_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" placeholder="•••••••••" required />
                    </div>
                    <div className="flex items-start mb-6">
                      <div className="flex items-center h-5">
                        <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                      </div>
                      <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
                    </div>
                    <div className="flex justify-end">
                      <button onClick={() => { handleSubmit(); setIsOpen(false); console.log(isOpen);}} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </div>
                  </form>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}



export default RegisterModal