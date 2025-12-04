import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./utils/AuthContext";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AdminLayout from "./pages/AdminPages/Layout";
import AdminDashboard from "./pages/AdminPages/Dashboard";
import AdminProfile from "./pages/AdminPages/Profile";
import Clients from "./pages/AdminPages/Clients";
import CreateProduct from "./pages/AdminPages/Shop/CreateProduct";
import CreateProductCategory from "./pages/AdminPages/Shop/CreateProductCategory";
import EditProduct from "./pages/AdminPages/Shop/EditProduct";
import ViewProducts from "./pages/AdminPages/Shop/ViewProducts";
import PurchaseOrders from "./pages/AdminPages/Shop/PurchaseOrders";
import CreateRoleAndPermissions from "./pages/AdminPages/Employees/CreateRoleAndPermissions";
import AssignRoleAndPermissions from "./pages/AdminPages/Employees/AssignRoleAndPermissions";
import Analytics from "./pages/AdminPages/Analytics";
import EatRightFacility from "./pages/AdminPages/EatRightFacility";
import About from "./pages/AdminPages/About";
import Settings from "./pages/AdminPages/Settings";
import AdminSupport from "./pages/AdminPages/Support";
import Departments from "./pages/AdminPages/Departments";
import Notifications from "./pages/AdminPages/Notifications";
import ClientLayout from "./pages/ClientPages/Layout";
import ClientProfile from "./pages/ClientPages/Profile";
import HealthAnalytics from "./pages/AdminPages/Analytics";
import Messages from "./pages/ClientPages/Messages";
import Shop from "./pages/ClientPages/Shop";
import ClientSupport from "./pages/ClientPages/Support";
import NutritionistSupport from "./pages/NutritionistPages/Support";
import NutritionistShop from "./pages/NutritionistPages/Shop";
import NutritionistClients from "./pages/NutritionistPages/Clients";
import NutritionistLayout from "./pages/NutritionistPages/Layout";
import NutritionistDashboard from "./pages/NutritionistPages/Dashboard";
import NutritionistProfile from "./pages/NutritionistPages/Profile";

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
            <Route path="clients" element={<Clients />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="eatrightrestaurant" element={<EatRightFacility />} />
            <Route path="support" element={<AdminSupport />} />
            <Route path="about" element={<About />} />
            <Route path="settings" element={<Settings />} />
            <Route path="departments" element={<Departments />} />
            <Route path="notifications" element={<Notifications />} />

            <Route path="shop">
              <Route path="view-products" element={<ViewProducts />} />
              <Route
                path="create-category"
                element={<CreateProductCategory />}
              />
              <Route path="create-product" element={<CreateProduct />} />
              <Route path="edit-products" element={<EditProduct />} />
              <Route path="purchase-orders" element={<PurchaseOrders />} />
            </Route>

            <Route path="employees">
              <Route
                path="create-role&permissions"
                element={<CreateRoleAndPermissions />}
              />
              <Route
                path="assign-role&permissions"
                element={<AssignRoleAndPermissions />}
              />
            </Route>
          </Route>

          <Route path="/client" element={<ClientLayout />}>
            <Route index element={<ClientProfile />} />
            <Route path="profile" element={<ClientProfile />} />
            <Route path="health-analytics" element={<HealthAnalytics />} />
            <Route path="messages" element={<Messages />} />
            <Route path="shop" element={<Shop />} />
            <Route path="support" element={<ClientSupport />} />
            <Route path="about" element={<About />} />
            <Route path="settings" element={<Settings />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>

          <Route path="/nutritionist" element={<NutritionistLayout />}>
            <Route index element={<NutritionistDashboard />} />
            <Route path="profile" element={<NutritionistProfile />} />
            <Route path="clients" element={<NutritionistClients />} />
            <Route path="messages" element={<Messages />} />
            <Route path="shop" element={<NutritionistShop />} />
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
