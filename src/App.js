import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import LegoSets from "./pages/LegoSets";
import LegoFormPage from "./pages/LegoFormPage";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem("token")
    );

    if (!isAuthenticated) {
        return <Login onLogin={() => setIsAuthenticated(true)} />;
    }

    return (
        <Routes>
            <Route path="/" element={<LegoSets />} />
            <Route path="/create" element={<LegoFormPage />} />
            <Route path="/edit/:id" element={<LegoFormPage />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

export default App;
