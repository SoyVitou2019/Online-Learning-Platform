import { BenefitCard } from "./BenefitCard";

export const HowVMWorks = () => {
  return (
    <div className="bg-gray-800 text-white  py-10">
      <h1 className=" text-center py-16 text-4xl font-bold tracking-tight leading-none dark:text-dark">
        How VM Works?
      </h1>

      <div className=" flex flex-wrap justify-center space-x-20 pb-10">
        <div className="flex  justify-center space-x-12 text-center">
          <div className="flex flex-col w-64 justify-center">
            <img src="src/assets/landing/fast.svg" className="w-24 mx-auto" />
            <p className="mt-5 mb-2 text-xl font-semibold tracking-tight text-white">
              Fast and Efficient
            </p>
          </div>
        </div>

        <div className="flex  justify-center space-x-12 text-center">
          <div className="flex flex-col w-64 justify-center">
            <img src="src/assets/landing/car.svg" className="w-24 mx-auto" />
            <p className="mt-5 mb-2 text-xl font-semibold tracking-tight text-white">
              Free for all
            </p>
          </div>
        </div>
        <div className="flex  justify-center space-x-12 text-center">
          <div className="flex flex-col w-64 justify-center">
            <img src="src/assets/landing/use.svg" className="w-24 mx-auto" />
            <p className="mt-5 mb-2 text-xl font-semibold tracking-tight text-white">
              Easy to use
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
