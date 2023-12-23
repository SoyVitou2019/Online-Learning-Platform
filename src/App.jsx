import { BrowserRouter, Routes, Route } from "react-router-dom";
//import { NavBar } from "./components/HomePage/NavBar";
//import { HeroSection } from "./components/HomePage/HeroSection";
//import { CardPortrait } from "./components/HomePage/CardPortrait";
// import { Link } from "react-router-dom";
//import HomePageFilter from "./components/HomePage/HomePageFilter";
//import { HomePage } from "./components/Pages/HomePage";
import { LandingPage } from "./components/Pages/LandingPage";
import { HomePage } from "./components/Pages/HomePage";
// import { CardLandscape } from "./components/Homepage/CardLandscape";
// import SelectCourse from "./components/Homepage/selectCourse";
// import PlayCourse from "./components/Homepage/PlayCourse";
// import AdminPage from "./components/Homepage/AdminPage";
function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/landingpage" element={<LandingPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
