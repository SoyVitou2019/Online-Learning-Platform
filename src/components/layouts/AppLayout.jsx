import React from 'react'
import { NavBar } from '../HomePage/NavBar'
import SideBar from '../HomePage/SideBar'


const AppLayout = ({ children }) => {
    return (
        <>
            <div className="sticky top-0 start-0 mb-3 ml-80">
                <NavBar />
            </div>

            <div className="flex justify-stretch">
                <div className='fixed top-20 start-0 mb-3'><SideBar /></div>
                <div className='ml-80'>{children}</div>
            </div>
        </>
    )
}

export default AppLayout