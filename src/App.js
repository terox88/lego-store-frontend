import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import LegoSets from "./pages/LegoSets";
import LegoFormPage from "./pages/LegoFormPage";
import { getRequestCount } from "./services/legoService";
import "./App.css";


function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem("token")
    );

    const [requestCount, setRequestCount] = useState(0);

    useEffect(() => {
        if (!isAuthenticated) return;

        const fetchCount = () => {
            getRequestCount()
                .then(res => setRequestCount(res.data))
                .catch(() => {});
        };

        fetchCount();

        const interval = setInterval(fetchCount, 5000);

        return () => clearInterval(interval);

    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return <Login onLogin={() => setIsAuthenticated(true)} />;
    }


    return (
        <div className="app-layout">
            <header className="app-header">
                <div className="header-left">
                    <h1>Lego Store Admin</h1>
                    <span className="header-subtitle">
            Internal management panel
        </span>
                </div>

                <div className="header-right">
        <span className="request-badge">
            Requests: {requestCount}
        </span>

                    <button
                        className="logout-btn"
                        onClick={() => {
                            localStorage.removeItem("token");
                            setIsAuthenticated(false);
                        }}
                    >
                        Logout
                    </button>
                </div>
            </header>

            <main className="app-content">
                <Routes>
                    <Route path="/" element={<LegoSets />} />
                    <Route path="/create" element={<LegoFormPage />} />
                    <Route path="/edit/:id" element={<LegoFormPage />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </main>
        </div>
    );

}

export default App;