import React, { useEffect, useState } from "react";
import Header from "./Header";
import MealPlanManager from "../MealPlanManager";
import { getAdminDashboard } from "../../services/adminService";
import { User } from "../../types/User";

// === Types ===
interface DashboardCounts {
  clients: number;
  admins: number;
  nutritionists: number;
}

interface LatestClient {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface DashboardData {
  total: DashboardCounts;
  latestClients: LatestClient[];
}

// === Component ===
export default function AdminProfile() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  
  const [error, setError] = useState<string | null>(null);

  // Fetch admin dashboard info
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const response = await getAdminDashboard();
        setDashboardData(response);
        setUser(response);
      } catch (err: any) {
        console.error("❌ Failed to fetch dashboard:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // Handle UI states
  if (loading) return <p className="p-6 text-gray-600">Loading dashboard...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  // Guard clause
  if (!dashboardData)
    return <p className="p-6 text-gray-600">No dashboard data available.</p>;

  const { total, latestClients } = dashboardData;

  return (
    <div className="p-6 space-y-8">
      <Header />

      {/* === Summary Cards === */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Total Clients" value={total.clients} color="bg-blue-500" />
        <DashboardCard title="Total Admins" value={total.admins} color="bg-purple-500" />
        <DashboardCard title="Nutritionists" value={total.nutritionists} color="bg-green-500" />
        <DashboardCard title="Latest Clients" value={latestClients.length} color="bg-orange-500" />
      </section>

      {/* === Latest Clients List === */}
      <section className="bg-white border rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Recent Clients</h3>
        <ul className="divide-y divide-gray-200">
          {latestClients.map((client) => (
            <li key={client._id} className="py-3 flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-800">{client.name}</p>
                <p className="text-sm text-gray-500">{client.email}</p>
              </div>
              <span className="text-xs text-gray-400">
                {new Date(client.createdAt).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* === Meal Plan Management (Optional for Admin) === */}
      <MealPlanManager user={user}/>
    </div>
  );
}

// === Small Reusable Card Component ===
interface CardProps {
  title: string;
  value: number;
  color?: string;
}

function DashboardCard({ title, value, color = "bg-gray-500" }: CardProps) {
  return (
    <div
      className={`${color} text-white rounded-xl p-5 shadow hover:shadow-lg transition duration-200`}
    >
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
