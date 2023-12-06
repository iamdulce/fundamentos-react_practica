import { Route, Routes, Navigate } from "react-router-dom";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import AdvertsPage from "./pages/adverts/AdvertsPage";
//import RequireAuth from "./pages/auth/components/Require.Auth";

function App() {
    return (
        <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/adverts" element={<AdvertsPage />} />
            <Route path="/" element={<Navigate to="/adverts" />} />
        </Routes>
    );
}

export default App;
