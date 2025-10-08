import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Pages
import Register from "./pages/Register";
import Login from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import NutritionistDashboard from "./pages/NutritionistDashboard";

// Layout or 404 page
import NotFound from "./pages/NotFound";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

// Protected Route wrapper
const ProtectedRoute = ({ children, roles }) => {
  const { token } = useAuth();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!token) return <Navigate to="/login" replace />;

  if (roles && !roles.includes(user.role))
    return <Navigate to="/login" replace />;

  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Auth routes */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Admin routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Client routes */}
          <Route
            path="/client/*"
            element={
              <ProtectedRoute roles={["client"]}>
                <ClientDashboard />
              </ProtectedRoute>
            }
          />

          {/* Nutritionist routes */}
          <Route
            path="/nutritionist/*"
            element={
              <ProtectedRoute roles={["nutritionist"]}>
                <NutritionistDashboard />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
