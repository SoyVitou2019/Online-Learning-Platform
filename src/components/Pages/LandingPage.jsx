import { NavBar } from "../HomePage/NavBar";
import { HeroSection } from "../HomePage/HeroSection";
import { PopularCoursesSection } from "../HomePage/PopularCoursesSection";
import { HowVMWorks } from "../HomePage/HowVMWorks";
import { Testamonial } from "../HomePage/Testamonial";
import { AboutUs } from "../Homepage/AboutUs";
import { SupportedBy } from "../Homepage/SupportedBy";
import { Footer } from "../Homepage/Footer";

export const LandingPage = () => {
  return (
    <>
      <NavBar />
      <HeroSection />
      <PopularCoursesSection />
      <HowVMWorks />
      <Testamonial />
      <AboutUs />
      <SupportedBy />
      <Footer />
    </>
  );
};
