import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./utils/AuthContext";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AdminLayout from "./pages/AdminPages/Layout";
import AdminDashboard from "./pages/AdminPages/Dashboard";
import AdminProfile from "./pages/AdminPages/Profile";
import Clients from "./pages/AdminPages/Clients";
import Analytics from "./pages/AdminPages/Analytics";
import About from "./pages/AdminPages/About";
import Settings from "./pages/AdminPages/Settings";
import Notifications from "./pages/AdminPages/Notifications";
import ClientLayout from "./pages/ClientPages/Layout";
import ClientProfile from "./pages/ClientPages/Profile";
import HealthAnalytics from "./pages/AdminPages/Analytics";
import Messages from "./pages/ClientPages/Messages";
import ClientSupport from "./pages/ClientPages/Support";
import NutritionistSupport from "./pages/NutritionistPages/Support";
import NutritionistClients from "./pages/NutritionistPages/Clients";
import NutritionistProfile from "./pages/NutritionistPages/Profile";
import ClientDashboard from "./pages/ClientPages/Dashboard";
import MealPlan from "./pages/ClientPages/MealPlan";
import ViewNutrionist from "./pages/AdminPages/Nutritionist";
import SubscriptionPlans from "./pages/Subscription";
import NutritionistLayout from "./pages/NutritionistPages/Layout";
import NutritionistDashboard from "./pages/NutritionistPages/Dashboard";
import AdminProfileUpdate from "./pages/AdminPages/UpdateAdminProfile";
import ClientProfileUpdate from "./pages/ClientPages/EditClientProfile";
import NutritionistProfileUpdate from "./pages/NutritionistPages/UpdateNutritionistProfile";
import Consultants from "./pages/AdminPages/Consultants";
import EditClient from "./pages/AdminPages/EditClient";
import EditNutritionist from "./pages/AdminPages/EditNutritionist";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="edit-profile" element={<AdminProfileUpdate />} />
            <Route path="clients" element={<Clients />} />
            <Route path="edit-client" element={<EditClient />} />
            <Route path="edit-nutritionist" element={<EditNutritionist />} />
            <Route path="consultants" element={<Consultants />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="about" element={<About />} />
            <Route path="settings" element={<Settings />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="nutritionist" element={<ViewNutrionist />} />
            <Route path="messages" element={<Messages />} />
          </Route>

          <Route path="/client" element={<ClientLayout />}>
            <Route index element={<ClientDashboard />} />
            <Route path="profile" element={<ClientProfile />} />
            <Route path="edit-profile" element={<ClientProfileUpdate />} />
            <Route path="dashboard" element={<ClientDashboard />} />
            <Route path="analytics" element={<HealthAnalytics />} />
            <Route path="messages" element={<Messages />} />{" "}
            <Route path="subscription" element={<SubscriptionPlans />} />
            <Route path="support" element={<ClientSupport />} />
            <Route path="meal-plan" element={<MealPlan />} />
            <Route path="about" element={<About />} />
            <Route path="settings" element={<Settings />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>

          <Route path="/nutritionist" element={<NutritionistLayout />}>
            <Route index element={<NutritionistDashboard />} />
            <Route path="profile" element={<NutritionistProfile />} />
            <Route
              path="edit-profile"
              element={<NutritionistProfileUpdate />}
            />
            <Route path="clients" element={<NutritionistClients />} />
            <Route path="messages" element={<Messages />} />
            <Route path="support" element={<NutritionistSupport />} />
            <Route path="about" element={<About />} />
            <Route path="settings" element={<Settings />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
