import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminDashboard } from "../../services/adminService";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { UserIcon, UserGroupIcon } from '@heroicons/react/24/outline';


interface UserData {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  assignedNutritionist?: string | null;
}

interface DashboardData {
  total: { clients: number; admins: number; nutritionists: number };
  clients: UserData[];
  nutritionist: UserData[];
  admin: UserData[];
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState<UserData | null>(null);
  const [selectedNutritionist, setSelectedNutritionist] = useState<UserData | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAdminDashboard();
        setData(res);
        toast.success("Dashboard loaded successfully!");
      } catch {
        toast.error("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-20 text-gray-500">Loading dashboard...</p>;
  if (!data) return <p className="text-center mt-20 text-red-500">No data available.</p>;

  return (
    <div className="p-6 space-y-8">
      <ToastContainer />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard title="Clients" value={data.total.clients} color="red" icon={<UserGroupIcon className="w-8 h-8 text-white"/>} />
        <StatCard title="Admins" value={data.total.admins} color="green" icon={<UserIcon className="w-8 h-8 text-white"/>} />
        <StatCard title="Nutritionists" value={data.total.nutritionists} color="blue" icon={<UserGroupIcon className="w-8 h-8 text-white"/>} />
      </div>

      <div className="bg-white rounded-xl shadow p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Assign Client to Nutritionist</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UserList
            title="Clients"
            users={data.clients}
            selectedId={selectedClient?._id}
            onSelect={setSelectedClient}
            navigate={navigate}
          />
          <UserList
            title="Nutritionists"
            users={data.nutritionist}
            selectedId={selectedNutritionist?._id}
            onSelect={setSelectedNutritionist}
            navigate={navigate}
          />
        </div>

        {selectedClient && selectedNutritionist && (
          <button
            className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg shadow-md hover:bg-green-700 transition"
            onClick={() => toast.success(`Assigned ${selectedClient.name} to ${selectedNutritionist.name}`)}
          >
            Assign Client
          </button>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, color, icon }: { title: string; value: number; color: string; icon?: React.ReactNode }) {
  return (
    <div className={`flex items-center space-x-4 p-6 rounded-xl shadow-md transition hover:shadow-lg bg-${color}-500 text-white`}>
      {icon && <div className="bg-white/20 p-2 rounded">{icon}</div>}
      <div>
        <h4 className="text-lg font-semibold">{title}</h4>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </div>
  );
}

function UserList({
  title,
  users,
  selectedId,
  onSelect,
  navigate,
}: {
  title: string;
  users: UserData[];
  selectedId?: string;
  onSelect: (user: UserData) => void;
  navigate: any;
}) {
  const handleUserClick = (user: UserData) => {
    onSelect(user); 
    navigate(`/admin/${title.toLowerCase()}-profile/${user._id}`);
  };

  return (
    <div className="bg-gray-50 rounded-xl shadow p-4 flex flex-col">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <ul className="divide-y divide-gray-200 overflow-y-auto max-h-80">
        {users.length === 0 && (
          <p className="text-gray-400 text-center py-4">No {title.toLowerCase()} found.</p>
        )}
        {users.map((u) => (
          <li
            key={u._id}
            onClick={() => handleUserClick(u)}
            className={`flex justify-between items-center p-3 rounded-lg cursor-pointer transition ${
              selectedId === u._id ? "bg-green-100 shadow-inner" : "hover:bg-gray-100"
            }`}
          >
            <div>
              <p className="font-medium text-gray-800">{u.name}</p>
              <p className="text-sm text-gray-500">{u.email}</p>
            </div>
            <span className="text-xs text-gray-400">{new Date(u.createdAt).toLocaleDateString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
