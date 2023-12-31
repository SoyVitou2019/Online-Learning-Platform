import React from "react";

export const ProfilePage = () => {
    return (
        <a href="#" className="flex items-center ps-2.5 mb-5">
            <i className="bi bi-person-circle w-20 text-6xl " style={{ color: 'black' }}></i>
            <div className="flex-col px-3 ">
                <span className="text-xl whitespace-nowrap dark:text-black font-bold">Eong Koungmeng</span>
                <div className="text-black text-xs">Followers: 15</div>
            </div>
        </a>
    )
}


