import { Link, Routes, Route, Outlet } from "react-router-dom";
import Profile from "./Profile";

import Settings from "./Settings";

const AdminDashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation bar */}
      <nav className="bg-green-600 text-white p-4 flex gap-4">
        <Link to="/admin/profile">Profile</Link>
        <Link to="/admin/settings">Settings</Link>
      </nav>

      {/* Where child routes render */}
      <main className="flex flex-col p-6">
        <Routes>
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
