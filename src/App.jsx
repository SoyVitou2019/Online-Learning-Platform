import { BrowserRouter, Routes, Route } from "react-router-dom";
//import { NavBar } from "./components/HomePage/NavBar";
//import { HeroSection } from "./components/HomePage/HeroSection";
//import { CardPortrait } from "./components/HomePage/CardPortrait";
// import { Link } from "react-router-dom";
//import HomePageFilter from "./components/HomePage/HomePageFilter";
//import { HomePage } from "./components/Pages/HomePage";
import { LandingPage } from "./components/Pages/LandingPage";
import { HomePage } from "./components/Pages/HomePage";
import { CardPortrait } from "./components/HomePage/CardPortrait";
import Content from "./components/Pages/content";
// import AppLayout from "./components/layouts/AppLayout";
// import { CardLandscape } from "./components/Homepage/CardLandscape";
// import SelectCourse from "./components/Homepage/selectCourse";
// import PlayCourse from "./components/Homepage/PlayCourse";
// import AdminPage from "./components/Homepage/AdminPage";

import { AppProvider } from "./providers/app";
import { AppRoutes } from "./routes";

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/landingpage" element={<LandingPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/card" element={<CardPortrait showDetail={false} />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
