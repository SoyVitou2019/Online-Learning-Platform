import React from "react";
import { useQuery } from "react-query"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Spinner } from "@/src/components/Spinner";

export const ViewProfile = () => {
    return (
        <div>
            <div className="bg-white border rounded-lg m-4 ">
                <div>
                    <div className="bg-gray-200 h-32 flex items-end justify-end p-4">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                    </div>

                </div>
                <a href="#" className="flex items-center ps-2.5 -mt-10 mx-4">
                    <Avatar className="w-32 h-32">
                        <AvatarImage src="https://cdn.britannica.com/62/192062-131-96B933EF/mug-shot-Colombia-control-agency-Medellin.jpg" />
                        <AvatarFallback>
                            <Spinner />
                        </AvatarFallback>
                    </Avatar>
                </a>

                <div className="flex justify-end px-4 ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                </div>

                <div className="flex-col p-8 ">
                    <span className="text-2xl whitespace-nowrap dark:text-black font-bold">Eong Koungmeng</span>
                    <h1 className="text-blue-500 text-md underline">@FuckyouUlittleCunt</h1>
                    <div className="flex justify-between pt-2 w-64">
                        <h1 className="text-black text-md">Role as a Student</h1>
                        <a href="#" className="text-black text-md underline">Contact Info</a>
                    </div>
                    <h1 className="text-blue-500 text-md pt-4 underline">15 followers</h1>
                    <div className="flex justify-between pt-2 w-64">

                        <Button className="mt-4 bg-blue-500 rounded-full hover:bg-blue-600">
                            <h1 className="text-white">
                                View Courses
                            </h1>
                        </Button>

                        <Button className="mt-4 bg-white rounded-full hover:bg-blue-600 border border-blue-500 hover:text-white text-blue-500">
                            <h1 className="">
                                Add profile info
                            </h1>
                        </Button>
                    </div>
                </div>
            </div>
            <div className="bg-white border rounded-lg m-4 ">
                <div className="flex-col p-8 ">
                    <h1 className="font-bold text-xl">Courses Recently View</h1>
                    <div className="flex justify-between pt-5">
                        <div className="border rounded-lg h-32 w-32"></div>
                        <div className="border rounded-lg h-32 w-32"></div>
                        <div className="border rounded-lg h-32 w-32"></div>
                        <div className="border rounded-lg h-32 w-32"></div>
                        <div className="border rounded-lg h-32 w-32"></div>
                    </div>
                </div>
            </div>
            <div className="bg-white border rounded-lg m-4 ">
                <div className="flex-col p-8 ">
                    <h1>Section B</h1>
                </div>
            </div>
            <div className="bg-white border rounded-lg m-4 ">
                <div className="flex-col p-8 ">
                    <h1>Section C</h1>
                </div>
            </div>
        </div>
    )
}



export const ProfilePage = () => {
    return (
        <a href="#" className="flex items-center ps-2.5 mb-5">
            <i className="bi bi-person-circle w-20 text-6xl " style={{ color: 'black' }}></i>
            <div className="flex-col px-3 ">
                <span className="text-xl whitespace-nowrap dark:text-black font-bold">Eong Koungmeng</span>
                <div className="text-black text-xs">Followers: 15</div>
                <Button />
            </div>
        </a>
    )
}


