import { Link, Routes, Route, Outlet } from "react-router-dom";
import Profile from "./Profile";
import Orders from "./Orders";
import Mealplan from "./MealPlan";

const ClientDashboard = () => {
   const user = JSON.parse(localStorage.getItem("user") || "{}");
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation bar */}
      <nav className="bg-green-600 text-white p-4 flex gap-4">
        <Link to="/client/profile">Profile</Link>
        <Link to="/client/orders">Orders</Link>
        <Link to="/client/mealplan">Meal Plan</Link>
      
      </nav>

      {/* Where child routes render */}
      <main className="flex flex-col p-6">
        <Routes>
          <Route path="profile" element={<Profile  user={user}/>} />
          <Route path="orders" element={<Orders />} />
          <Route path="mealplan" element={<Mealplan />} />
        
        </Routes>
      </main>
    </div>
  );
};

export default ClientDashboard;
