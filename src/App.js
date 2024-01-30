import { Route, Routes, Navigate } from "react-router-dom";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import AdvertsPage from "./pages/adverts/AdvertsPage";
import NotFound from "./pages/NotFound";
import RequireAuth from "./pages/auth/components/Require.Auth";
import NewAdvertPage from "./pages/adverts/NewAdvertPage";
import AdvertPage from "./pages/adverts/AdvertPage";

function App() {
    return (
        <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
                path="/adverts"
                element={
                    <RequireAuth>
                        <AdvertsPage />
                    </RequireAuth>
                }
            />
            <Route
                path="/adverts/:advertId"
                element={
                    <RequireAuth>
                        <AdvertPage />
                    </RequireAuth>
                }
            />
            <Route
                path="/adverts/new"
                element={
                    <RequireAuth>
                        <NewAdvertPage />
                    </RequireAuth>
                }
            />
            <Route path="/" element={<Navigate to="/adverts" />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
    );
}

export default App;
