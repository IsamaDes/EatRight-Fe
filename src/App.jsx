import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./utils/AuthContext";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ClientProfile from "./pages/ClientPages/Profile";
import AdminProfile from "./pages/AdminPages/Profile";
import NutritionistProfile from "./pages/nutritionistPages/Profile";
import MealPlanManager from "./pages/mealPlanManager";
import Settings from "./components/Settings";
import UserProfile from "./pages/UserProfile";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/users/:id" element={<UserProfile />} />
          <Route path="/client" element={<ClientProfile />} />
          <Route path="/admin" element={<AdminProfile />} />
          <Route path="/nutritionist" element={<NutritionistProfile />} />
          <Route path="/meal-plan" element={<MealPlanManager />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
