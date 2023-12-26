import { NavBar } from "../HomePage/NavBar";
import { HeroSection } from "../HomePage/HeroSection";
import { PopularCoursesSection } from "../HomePage/PopularCoursesSection";
import { HowVMWorks } from "../HomePage/HowVMWorks";
import { Testamonial } from "../HomePage/Testamonial";
import { AboutUs } from "../HomePage/AboutUs";
import { SupportedBy } from "../HomePage/SupportedBy";
import { Footer } from "../HomePage/Footer";

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
