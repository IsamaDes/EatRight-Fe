import React, { useEffect, useState } from "react";
import Header from "./Header";
import { getAdminDashboard } from "../../services/adminService";
import { useNavigate } from "react-router-dom";
import { User } from "../../types/User";

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

interface UserData {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  assignedNutritionist?: string;
}


interface DashboardData {
  total: DashboardCounts;
  latestClients: LatestClient[];
  clients: UserData[],
  nutritionist: UserData[],
  admin: UserData[],

}

export default function AdminProfile() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  
  const [error, setError] = useState<string | null>(null);

   const [activeSection, setActiveSection] = useState<string | null>(null);
  const [modalList, setModalList] = useState<UserData[]>([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const response = await getAdminDashboard();
        console.log("Admis dashboard response", response)
        setDashboardData(response);
        setUser(response);
      } catch (err: any) {
        console.error(" Failed to fetch dashboard:", err);
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
  if (!dashboardData)
    return <p className="p-6 text-gray-600">No dashboard data available.</p>;

  const { total, latestClients, clients, admin, nutritionist } = dashboardData;

 const handleCardClick = (section: string, list: UserData[]) => {
 if(activeSection == section){
  setActiveSection(null);
  setModalList([]);
 } else {
  setActiveSection(section);
  setModalList(list);
 }
 }

  return (
    <div className="p-6 space-y-8">
      <Header />

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Total Clients" value={total.clients} color="bg-blue-500" onclick={() => handleCardClick("Clients", clients)}/>
        <DashboardCard title="Total Admins" value={total.admins} color="bg-purple-500" onclick={() => handleCardClick("Admins", admin)}/>
        <DashboardCard title="Nutritionists" value={total.nutritionists} color="bg-green-500" onclick={() => handleCardClick("Nutritionists", nutritionist)} />
        <DashboardCard title="Latest Clients" value={latestClients.length} color="bg-orange-500" onclick={() => handleCardClick("Latest Clients", latestClients)} />
      </section>



       {activeSection && (
        <div className="bg-white border rounded-lg shadow p-6 mt-4 animate-fadeIn">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">{activeSection}</h3>
            <button
              onClick={() => setActiveSection(null)}
              className="text-gray-500 hover:text-gray-700 font-medium"
            >
              Close ✕
            </button>
          </div>

          {modalList?.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No records found.</p>
          ) : (
            <ul className="divide-y divide-gray-200 max-h-80 overflow-y-auto">
              {modalList?.map((user) => (
                <li key={user._id} 
                onClick={() => navigate(`/users/${user?._id}`)}
                className="py-3 flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                  
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}





interface CardProps {
  title: string;
  value: number;
  color?: string;
  onclick?: () => void
}

function DashboardCard({ title, value, color, onclick }: CardProps) {
  return (
    <div
    onClick={onclick}
      className={`${color} text-white rounded-xl p-5 shadow hover:shadow-lg transition cursor-pointer`}
    >
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
