import React from 'react'
import HomePageFilter from '../HomePage/HomePageFilter'
import { CardPortrait } from '../HomePage/CardPortrait'

const Video = () => {
    return (
        <>
            <div className="mx-5">
                <HomePageFilter />
                <h1 className=" text-2xl font-bold m-2">Popular</h1>
                <hr />
                <div className="grid grid-cols-3 p-5 gap-4">
                    <CardPortrait />
                    <CardPortrait />
                    <CardPortrait />
                    <CardPortrait />
                    <CardPortrait />
                    <CardPortrait />
                </div>
                <h1 className=" text-2xl font-bold m-2">News</h1>
                <hr />
                <div className="grid grid-cols-3 p-5 gap-4">
                    <CardPortrait />
                    <CardPortrait />
                    <CardPortrait />
                    <CardPortrait />
                    <CardPortrait />
                    <CardPortrait />
                </div>
            </div>
        </>
    )
}

export default Video