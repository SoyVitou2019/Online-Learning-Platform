import { BrowserRouter, Routes, Route } from "react-router-dom";

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
