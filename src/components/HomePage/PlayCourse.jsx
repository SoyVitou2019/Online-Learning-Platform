import React from "react";

const PlayCourse = () => {
    return (
        <section>
            <section className="mx-3">
                <h1 className=" py-10 font-bold text-2xl ml-3">The Python Tutorial for Beginner</h1>
                <div className="flex">

                    {/* left side */}
                    <div className=" bg-slate-200">
                        
                        <div className="mx-2 py-2 flex flex-col gap-2">
                        <p className=" font-bold text-xl">Course Content</p>
                            {/* Item1 */}
                            <div className="flex items-center bg-green-300">
                                <img className="w-40 aspect-video" src="https://fakeimg.pl/1600x900" alt="" />
                                <div className="flex flex-col flex-grow">
                                    <h5 className="text-black font-bold ml-4">The Complete Python Course 2023</h5>
                                </div>
                                <p className="mr-4 mt-auto mb-2">15:22</p>
                            </div>
                            {/* Item2 */}
                            <div className="flex items-center bg-green-300">
                                <img className="w-40 aspect-video" src="https://fakeimg.pl/1600x900" alt="" />
                                <div className="flex flex-col flex-grow">
                                    <h5 className="text-black font-bold ml-4">The Complete Python Course 2023</h5>
                                </div>
                                <p className="mr-4 mt-auto mb-2">15:22</p>
                            </div>
                            {/* Item3 */}
                            <div className="flex items-center bg-green-300">
                                <img className="w-40 aspect-video" src="https://fakeimg.pl/1600x900" alt="" />
                                <div className="flex flex-col flex-grow">
                                    <h5 className="text-black font-bold ml-4">The Complete Python Course 2023</h5>
                                </div>
                                <p className="mr-4 mt-auto mb-2">15:22</p>
                            </div>
                            {/* Item4 */}
                            <div className="flex items-center bg-green-300">
                                <img className="w-40 aspect-video" src="https://fakeimg.pl/1600x900" alt="" />
                                <div className="flex flex-col flex-grow">
                                    <h5 className="text-black font-bold ml-4">The Complete Python Course 2023</h5>
                                </div>
                                <p className="mr-4 mt-auto mb-2">15:22</p>
                            </div>
                            {/* Item5 */}
                            <div className="flex items-center bg-green-300">
                                <img className="w-40 aspect-video" src="https://fakeimg.pl/1600x900" alt="" />
                                <div className="flex flex-col flex-grow">
                                    <h5 className="text-black font-bold ml-4">The Complete Python Course 2023</h5>
                                </div>
                                <p className="mr-4 mt-auto mb-2">15:22</p>
                            </div>
                            {/* Item6 */}
                            <div className="flex items-center bg-green-300">
                                <img className="w-40 aspect-video" src="https://fakeimg.pl/1600x900" alt="" />
                                <div className="flex flex-col flex-grow">
                                    <h5 className="text-black font-bold ml-4">The Complete Python Course 2023</h5>
                                </div>
                                <p className="mr-4 mt-auto mb-2">15:22</p>
                            </div>
                        </div>
                    </div>

                    {/* right side */}
                    <div>
                        {/* frame */}
                        <div className="px-10">
                            <img className="aspect-video" src="https://fakeimg.pl/1080x720" alt="" />
                            <div className=" mt-4">
                                <p className=" font-bold text-xl">Python Beginner to Advanced 1</p>
                                <p className="mt-2">Master Python by building 100 projects in 100 days. learn data science, automation, build websites, games and apps!</p>
                                <p className="mt-3">Awesome video! One small thing is that the music was a little bit too loud compared to the volume of your voice at parts. Good luck with your project !! ... more</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    )
}


export default PlayCourse