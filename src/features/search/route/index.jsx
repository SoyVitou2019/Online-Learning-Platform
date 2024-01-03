import { Route, Routes } from "react-router-dom";
import SearchPage from "./SearchPage";

export const SearchRoutes = () => {
  return (
    <Routes>
      <Route path=":search_query" element={<SearchPage />} />
    </Routes>
  );
};
