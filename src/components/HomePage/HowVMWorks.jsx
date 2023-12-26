import { BenefitCard } from "./BenefitCard";

export const HowVMWorks = () => {
    return (
        <div className="bg-gray-900 text-white">
            <h1 className="text-center py-16 text-4xl font-bold tracking-tight leading-none dark:text-dark">
                How VM Works?
            </h1>

            <div className=" flex flex-wrap justify-center space-x-20 pb-10">
                <BenefitCard />
                <BenefitCard />
                <BenefitCard />
            </div>
        </div>
    );
};
