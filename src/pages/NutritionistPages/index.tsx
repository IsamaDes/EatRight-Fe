import { Link, Routes, Route, Outlet } from "react-router-dom";
import Profile from "./Profile";
import MealPlan from "./MealPlan";


const NutritionistDashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation bar */}
      <nav className="bg-green-600 text-white p-4 flex gap-4">
        <Link to="/nutritionist/profile">Profile</Link>
        <Link to="/nutritionist/MealPlan">MealPlan</Link>
       
      </nav>

      {/* Where child routes render */}
      <main className="flex flex-col p-6">
        <Routes>
          <Route path="profile" element={<Profile />} />
          <Route path="MealPlan" element={<MealPlan />} />
        </Routes>
      </main>
    </div>
  );
};

export default NutritionistDashboard;
