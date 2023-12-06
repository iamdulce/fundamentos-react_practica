import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login/Login";
//import RequireAuth from "./pages/auth/components/Require.Auth";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}

export default App;
