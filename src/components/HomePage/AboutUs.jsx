import { BenefitCard } from "./BenefitCard";

export const AboutUs = () => {
    return (
        <div className="bg-gray-800 text-white">
            <h1 className="text-center py-16 text-4xl font-bold tracking-tight leading-none dark:text-dark">
                About Us
            </h1>

            <div className=" flex flex-wrap justify-center space-x-20 pb-10">
                <div className="flex flex-wrap justify-center space-x-12 text-center">
                    <div className="flex flex-col w-64 justify-center">
                        <img
                            src="https://avatars.githubusercontent.com/u/107832453?v=4"
                            alt=""
                        />
                        <p className="mt-5 mb-2 text-xl font-semibold tracking-tight text-white">
                            Eong Koungmeng
                        </p>
                        <p className="text-sm mb-5 font-semibold tracking-tight text-white">
                            Developer
                        </p>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center space-x-12 text-center">
                    <div className="flex flex-col w-64 justify-center">
                        <div className="rounded-lg">
                            <img
                                src="https://avatars.githubusercontent.com/u/118577815?v=4"
                                alt=""
                            />
                        </div>
                        <p className="mt-5 mb-2 text-xl font-semibold tracking-tight text-white">
                            Soy Vitou
                        </p>
                        <p className="text-sm mb-5 font-semibold tracking-tight text-white">
                            Developer
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center space-x-12 text-center">
                    <div className="flex flex-col w-64 justify-center">
                        <img
                            src="reth.jpeg"
                            alt=""
                        />
                        <p className="mt-5 mb-2 text-xl font-semibold tracking-tight text-white">
                            Lu Samreth
                        </p>
                        <p className="text-sm mb-5 font-semibold tracking-tight text-white">
                            Linux Admin/Dev
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
