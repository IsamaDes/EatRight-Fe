import { useEffect, useState } from "react";
import { getAdminDashboard } from "../../services/adminService";

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

export default function NutritionistDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedClient, setSelectedClient] = useState<UserData | null>(null);
  const [selectedNutritionist, setSelectedNutritionist] = useState<UserData | null>(null);
  // const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await getAdminDashboard();
        setData(res);
      } catch {
        setError("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-blue-500">{error}</p>;
  if (!data) return <p className="p-6">No data available.</p>;

  return (
    <div className="p-6 space-y-8">
  

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Clients" value={data.total.clients} color="red" />
        <StatCard title="Admins" value={data.total.admins} color="green" />
        <StatCard title="Nutritionists" value={data.total.nutritionists} color="green" />
      </div>

      {/* Lists */}
      <div className="bg-blue-500">
      <p>Create Appointment By Assigning a client to a nutritionist</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UserList
          title="Clients"
          users={data.clients}
          selectedId={selectedClient?._id}
          onSelect={setSelectedClient}
        />
        <UserList
          title="Nutritionists"
          users={data.nutritionist}
          selectedId={selectedNutritionist?._id}
          onSelect={setSelectedNutritionist}
        />
      </div>
</div>
    
    </div>
  );
}

function StatCard({ title, value, color }: { title: string; value: number; color: string }) {
  return (
    <div
      className={`bg-${color}-500 text-white p-4 rounded-xl shadow hover:shadow-lg transition`}
    >
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}

function UserList({
  title,
  users,
  selectedId,
  onSelect,
}: {
  title: string;
  users: UserData[];
  selectedId?: string;
  onSelect: (user: UserData) => void;
}) {
  return (
    <div className="bg-green-500 rounded-lg shadow p-4">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <ul className="divide-y divide-gray-200 max-h-80 overflow-y-auto">
        {users.length === 0 && (
          <p className="text-gray-500 text-sm text-center py-4">No {title.toLowerCase()} found.</p>
        )}
        {users.map((u) => (
          <li
            key={u._id}
            onClick={() => onSelect(u)}
            className={`flex justify-between items-center p-2 rounded-md cursor-pointer ${
              selectedId === u._id ? "bg-blue-100" : "hover:bg-gray-50"
            }`}
          >
            <div>
              <p className="font-medium text-gray-800">{u.name}</p>
              <p className="text-sm text-gray-500">{u.email}</p>
            </div>
            <span className="text-xs text-gray-400">
              {new Date(u.createdAt).toLocaleDateString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
