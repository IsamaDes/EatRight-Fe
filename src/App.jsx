import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./utils/AuthContext";

import AdminDashboard from "./pages/AdminPages/index";
import NutritionistDashboard from "./pages/NutritionistPages/index";

import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ClientDashboard from "./pages/ClientPages";
import ProtectedRoute from "./utils/ProtectedRoutes";
import ClientProfilePage from "./pages/ClientPages/ClientProfilePage";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Auth routes */}
          <Route path="/" element={<HomePage />} />
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
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
