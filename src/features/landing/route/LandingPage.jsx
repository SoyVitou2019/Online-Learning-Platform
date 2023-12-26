import { NavBar } from "../../../components/HomePage/NavBar";
import { HeroSection } from "../components/HeroSection";
import { PopularCoursesSection } from "../../../components/HomePage/PopularCoursesSection";
import { HowVMWorks } from "../../../components/HomePage/HowVMWorks";
import { Testamonial } from "../../../components/HomePage/Testamonial";
import { AboutUs } from "../../../components/HomePage/AboutUs";
import { SupportedBy } from "../../../components/HomePage/SupportedBy";
import { Footer } from "../../../components/HomePage/Footer";

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
