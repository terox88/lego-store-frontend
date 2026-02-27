import { useState } from "react";
import Login from "./pages/Login";
import LegoSets from "./pages/LegoSets";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
      !!localStorage.getItem("token")
  );

    return (
        <div className="container">
            {isAuthenticated ? (
                <LegoSets />
            ) : (
                <Login onLogin={() => setIsAuthenticated(true)} />
            )}
        </div>
    );
}

export default App;