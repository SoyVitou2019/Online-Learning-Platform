import { BrowserRouter, Routes, Route } from "react-router-dom";
//import { NavBar } from "./components/HomePage/NavBar";
//import { HeroSection } from "./components/HomePage/HeroSection";
//import { CardPortrait } from "./components/HomePage/CardPortrait";
// import { Link } from "react-router-dom";
//import HomePageFilter from "./components/HomePage/HomePageFilter";
//import { HomePage } from "./components/Pages/HomePage";
// import { LandingPage } from "./components/Pages/LandingPage";
// import { HomePage } from "./components/Pages/HomePage";
// import { CardPortrait } from "./components/HomePage/CardPortrait";

// import { CardLandscape } from "./components/Homepage/CardLandscape";
// import SelectCourse from "./components/Homepage/selectCourse";
// import PlayCourse from "./components/Homepage/PlayCourse";
// import AdminPage from "./components/Homepage/AdminPage";

import { AppProvider } from "./providers/app";
import { AppRoutes } from "./routes";
import AuthProvider from "./features/auth/api/Auth";

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
