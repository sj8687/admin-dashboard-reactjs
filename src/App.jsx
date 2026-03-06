import { BrowserRouter as BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/login";
import ProtectedRoute from "./Protectedroute/protected";
import DashboardLayout from "./Layouts/DashboardLayout";
import "./index.css";
import "./App.css";
function App() {
    return (<BrowserRouter>
      <Routes>

        {/* Redirect root */}
        <Route path="/" element={<Navigate to="/login"/>}/>

        {/* Login */}
        <Route path="/login" element={<Login />}/>

        {/* Protected dashboard */}
        <Route path="/dashboard" element={<ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>}/>

      </Routes>
    </BrowserRouter>);
}
export default App;
