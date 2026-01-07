

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getNutritionistDashboard } from "../../services/nutritionistService";

// interface Client {
//   _id: string;
//   name?: string;
//   email?: string;
//   createdAt?: string;
// }

// interface MealPlan {
//   id: string;
//   clientName?: string;
//   nutritionistName?: string;
//   createdAt?: string;
// }

// interface DashboardData {
//   profile: {
//     id: string;
//     name: string | null;
//     email: string;
//     role: string;
//     profile: {
//       certification: string | null;
//       experienceYears: number | null;
//     } | null;
//   } | null;
//   clients: Client[];
//   mealPlans: MealPlan[];
//   stats: {
//     totalClients: number;
//     totalMealPlans: number;
//   };
// }

// export default function NutritionistDashboardPage() {
//   const [data, setData] = useState<DashboardData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await getNutritionistDashboard();
//         setData(res);
//       } catch (err) {
//         setError("Failed to load dashboard");
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   if (loading) return <p className="p-6 text-gray-600">Loading...</p>;
//   if (error) return <p className="p-6 text-red-500">{error}</p>;
//   if (!data) return <p className="p-6 text-gray-500">No data available.</p>;

//   return (
//     <div className="p-6 space-y-8">

//       {/* PROFILE CARD */}
//       <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg rounded-2xl p-6">
//         <h3 className="text-2xl font-bold mb-4">Profile Overview</h3>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm md:text-base">
//           <div><span className="font-semibold">Name:</span> {data.profile?.name || "—"}</div>
//           <div><span className="font-semibold">Email:</span> {data.profile?.email || "—"}</div>
//           <div><span className="font-semibold">Role:</span> {data.profile?.role || "—"}</div>
//           <div><span className="font-semibold">Certification:</span> {data.profile?.profile?.certification || "—"}</div>
//           <div><span className="font-semibold">Experience:</span> {data.profile?.profile?.experienceYears ?? "—"} years</div>
//         </div>
//       </div>

//       {/* STAT CARDS */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         <StatCard title="Total Clients" value={data.stats.totalClients} color="indigo" icon="👥" />
//         <StatCard title="Total Meal Plans" value={data.stats.totalMealPlans} color="green" icon="🥗" />
//       </div>

//       {/* CLIENTS LIST */}
//       <ItemList<Client>
//         title="Clients"
//         items={data.clients}
//         fields={["name", "email", "createdAt"]}
//         onSelect={(client) => navigate(`/clients/${client._id}`)}
//       />

//       {/* MEAL PLANS LIST */}
//       <ItemList<MealPlan>
//         title="Meal Plans"
//         items={data.mealPlans}
//         fields={["clientName", "nutritionistName", "createdAt"]}
//         onSelect={(mealPlan) => navigate(`/mealplans/${mealPlan.id}`)}
//       />

//     </div>
//   );
// }

// /* ------------------ STAT CARD ------------------ */
// function StatCard({ title, value, color, icon }: { title: string; value: number; color: string; icon: string }) {
//   return (
//     <div className={`flex items-center justify-between p-6 rounded-2xl shadow-lg bg-${color}-500 text-white hover:scale-105 transform transition`}>
//       <div>
//         <h4 className="text-lg font-semibold">{title}</h4>
//         <p className="text-3xl font-bold mt-1">{value}</p>
//       </div>
//       <div className="text-4xl">{icon}</div>
//     </div>
//   );
// }

// /* ------------------ GENERIC ITEM LIST ------------------ */
// function ItemList<T extends Record<string, any>>({
//   title,
//   items,
//   fields,
//   onSelect,
// }: {
//   title: string;
//   items: T[];
//   fields: (keyof T)[];
//   onSelect: (item: T) => void;
// }) {
//   return (
//     <div className="bg-white shadow-lg rounded-2xl p-6">
//       <h3 className="text-xl font-bold mb-4">{title}</h3>
//       <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
//         {items.length === 0 ? (
//           <li className="p-4 text-gray-500 text-center">No {title.toLowerCase()} found.</li>
//         ) : (
//           items.map((item, idx) => {
//             const id = item._id || item.id || idx;
//             return (
//               <li
//                 key={id}
//                 onClick={() => onSelect(item)}
//                 className="flex flex-col p-4 rounded-xl cursor-pointer hover:shadow-md hover:bg-gray-50 transition"
//               >
//                 {fields.map((field) => (
//                   <span key={String(field)} className="text-gray-700 text-sm md:text-base">
//                     <strong>{String(field)}:</strong> {item[field] ?? "—"}
//                   </span>
//                 ))}
//               </li>
//             );
//           })
//         )}
//       </ul>
//     </div>
//   );
// }










import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getNutritionistDashboard } from "../../services/nutritionistService";

interface Client {
  _id: string;
  name?: string;
  email?: string;
  createdAt?: string;
}

interface MealPlan {
  id: string;
  clientName?: string;
  nutritionistName?: string;
  createdAt?: string;
}

interface DashboardData {
  profile: {
    id: string;
    name: string | null;
    email: string;
    role: string;
    profile: {
      certification: string | null;
      experienceYears: number | null;
    } | null;
  } | null;
  clients: Client[];
  mealPlans: MealPlan[];
  stats: {
    totalClients: number;
    totalMealPlans: number;
  };
}

export default function NutritionistDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await getNutritionistDashboard();
        setData(res);
      } catch (err) {
        setError("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p className="p-6 text-gray-500">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!data) return <p className="p-6 text-gray-500">No data available.</p>;

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      
      {/* ================= Profile Card ================= */}
      <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{data.profile?.name || "No Name"}</h2>
          <p className="text-gray-500">{data.profile?.role || "Nutritionist"}</p>
        </div>
        <div className="flex gap-8">
          <ProfileStat title="Certification" value={data.profile?.profile?.certification || "N/A"} />
          <ProfileStat title="Experience (yrs)" value={data.profile?.profile?.experienceYears ?? "N/A"} />
        </div>
      </div>

      {/* ================= Stats Cards ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Clients" value={data.stats.totalClients} color="blue" />
        <StatCard title="Total Meal Plans" value={data.stats.totalMealPlans} color="green" />
      </div>

      {/* ================= Clients List ================= */}
      <ItemList<Client>
        title="Clients"
        items={data.clients}
        fields={["name", "email", "createdAt"]}
        onSelect={(client) => navigate(`/clients/${client._id}`)}
      />

      {/* ================= Meal Plans List ================= */}
      <ItemList<MealPlan>
        title="Meal Plans"
        items={data.mealPlans}
        fields={["clientName", "nutritionistName", "createdAt"]}
        onSelect={(mealPlan) => navigate(`/mealplans/${mealPlan.id}`)}
      />
    </div>
  );
}

/* ----------------- Stat Card ----------------- */
function StatCard({ title, value, color }: { title: string; value: number; color: string }) {
  const colors: Record<string, string> = {
    blue: "from-blue-400 to-blue-600",
    green: "from-green-400 to-green-600",
    yellow: "from-yellow-400 to-yellow-500",
    red: "from-red-400 to-red-600",
  };
  return (
    <div className={`bg-gradient-to-r ${colors[color] || colors.blue} text-white p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center`}>
      <p className="text-sm font-medium">{title}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}

/* ----------------- Profile Stat Mini Card ----------------- */
function ProfileStat({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-gray-100 rounded-xl p-4 text-center shadow-sm">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="font-semibold text-gray-800 mt-1">{value}</p>
    </div>
  );
}

/* ----------------- Generic Item List ----------------- */
function ItemList<T extends Record<string, any>>({
  title,
  items,
  fields,
  onSelect,
}: {
  title: string;
  items: T[];
  fields: (keyof T)[];
  onSelect: (item: T) => void;
}) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <ul className="divide-y divide-gray-200 max-h-80 overflow-y-auto">
        {items.length === 0 && (
          <li className="p-3 text-gray-500 text-center">No {title.toLowerCase()} found.</li>
        )}
        {items.map((item, idx) => {
          const id = item._id || item.id || idx;
          return (
            <li
              key={id}
              onClick={() => onSelect(item)}
              className="flex flex-col md:flex-row justify-between p-4 rounded-xl cursor-pointer hover:bg-gray-50 transition-shadow duration-150 shadow-sm mb-2"
            >
              {fields.map((field) => (
                <span key={String(field)} className="text-gray-700 text-sm md:text-base">
                  <strong>{String(field)}:</strong> {item[field] ?? "N/A"}
                </span>
              ))}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
