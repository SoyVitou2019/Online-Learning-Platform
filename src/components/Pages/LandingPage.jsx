import { NavBar } from "../HomePage/NavBar";
import { HeroSection } from "../HomePage/HeroSection";
import { PopularCoursesSection } from "../HomePage/PopularCoursesSection";
import { HowVMWorks } from "../HomePage/HowVMWorks";
import { Testamonial } from "../HomePage/Testamonial";

export const LandingPage = () => {
  return (
    <>
      <NavBar />
      <HeroSection />
      <PopularCoursesSection />
      <HowVMWorks />
      <Testamonial />
    </>
  );
};
