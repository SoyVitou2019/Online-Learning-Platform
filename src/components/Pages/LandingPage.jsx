import { NavBar } from "../HomePage/NavBar";
import { HeroSection } from "../HomePage/HeroSection";
import { PopularCoursesSection } from "../HomePage/PopularCoursesSection";
import { HowVMWorks } from "../HomePage/HowVMWorks";

export const LandingPage = () => {
  return (
    <>
      <NavBar />
      <HeroSection />
      <PopularCoursesSection />
      <HowVMWorks />
    </>
  );
};
