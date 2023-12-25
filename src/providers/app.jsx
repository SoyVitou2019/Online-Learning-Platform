import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";

export const AppProvider = ({ children }) => {
  return (
    <BrowserRouter>
      <main>{children}</main>
    </BrowserRouter>
  );
};
