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
//   profile: any | null;
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
//         setData(res.data);
//       } catch (err) {
//         setError("Failed to load dashboard");
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   if (loading) return <p className="p-6">Loading...</p>;
//   if (error) return <p className="p-6 text-red-500">{error}</p>;
//   if (!data) return <p className="p-6">No data available.</p>;

//   return (
//     <div className="p-6 space-y-8">
//       {/* Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         <StatCard title="Total Clients" value={data.stats.totalClients} color="blue" />
//         <StatCard title="Total Meal Plans" value={data.stats.totalMealPlans} color="green" />
//       </div>

//       {/* Clients List */}
//       <ItemList<Client>
//         title="Clients"
//         items={data.clients}
//         fields={["name", "email", "createdAt"]}
//         onSelect={(client) => navigate(`/clients/${client._id}`)}
//       />

//       {/* Meal Plans List */}
//       <ItemList<MealPlan>
//         title="Meal Plans"
//         items={data.mealPlans}
//         fields={["clientName", "nutritionistName", "createdAt"]}
//         onSelect={(mealPlan) => navigate(`/mealplans/${mealPlan.id}`)}
//       />
//     </div>
//   );
// }

// // Generic Stat Card
// function StatCard({ title, value, color }: { title: string; value: number; color: string }) {
//   return (
//     <div className={`bg-${color}-500 text-white p-4 rounded-xl shadow`}>
//       <h4 className="text-lg font-semibold">{title}</h4>
//       <p className="text-3xl font-bold mt-2">{value}</p>
//     </div>
//   );
// }

// // Generic ItemList: works for clients, meal plans, etc.
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
//   <div className="p-6 space-y-8">

//     {/* Profile Info */}
//     <div className="bg-white shadow rounded-lg p-4">
//       <h3 className="text-xl font-semibold mb-3">Profile Information</h3>

//       <div className="space-y-1 text-sm text-gray-700">
//         <p><strong>Name:</strong> {data.profile?.name || "No data"}</p>
//         <p><strong>Email:</strong> {data.profile?.email || "No data"}</p>
//         <p><strong>Role:</strong> {data.profile?.role || "No data"}</p>

//         {/* Nutritionist fields */}
//         <p><strong>Certification:</strong> {data.profile?.profile?.certification || "No data"}</p>
//         <p><strong>Experience Years:</strong> {data.profile?.profile?.experienceYears ?? "No data"}</p>
//       </div>
//     </div>

//     {/* Stats */}
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//       <StatCard title="Total Clients" value={data.stats.totalClients} color="blue" />
//       <StatCard title="Total Meal Plans" value={data.stats.totalMealPlans} color="green" />
//     </div>

//     {/* Clients List */}
//     <ItemList<Client>
//       title="Clients"
//       items={data.clients}
//       fields={["name", "email", "createdAt"]}
//       onSelect={(client) => navigate(`/clients/${client._id}`)}
//     />

//     {/* Meal Plans List */}
//     <ItemList<MealPlan>
//       title="Meal Plans"
//       items={data.mealPlans}
//       fields={["clientName", "nutritionistName", "createdAt"]}
//       onSelect={(mealPlan) => navigate(`/mealplans/${mealPlan.id}`)}
//     />
//   </div>
// );

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
        console.log("profile response", res)
          console.log("profileData response", res.data)
        setData(res);
      } catch (err) {
        setError("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!data) return <p className="p-6">No data available.</p>;

  return (
    <div className="p-6 space-y-8">

      {/* Profile Info */}
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-3">Profile Information</h3>

        <div className="space-y-1 text-sm text-gray-700">
          <p><strong>Name:</strong> {data.profile?.name || "No data"}</p>
          <p><strong>Email:</strong> {data.profile?.email || "No data"}</p>
          <p><strong>Role:</strong> {data.profile?.role || "No data"}</p>

          {/* Nutritionist-specific fields */}
          <p>
            <strong>Certification:</strong>{" "}
            {data.profile?.profile?.certification || "No data"}
          </p>

          <p>
            <strong>Experience Years:</strong>{" "}
            {data.profile?.profile?.experienceYears ?? "No data"}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Clients" value={data.stats.totalClients} color="blue" />
        <StatCard title="Total Meal Plans" value={data.stats.totalMealPlans} color="green" />
      </div>

      {/* Clients List */}
      <ItemList<Client>
        title="Clients"
        items={data.clients}
        fields={["name", "email", "createdAt"]}
        onSelect={(client) => navigate(`/clients/${client._id}`)}
      />

      {/* Meal Plans List */}
      <ItemList<MealPlan>
        title="Meal Plans"
        items={data.mealPlans}
        fields={["clientName", "nutritionistName", "createdAt"]}
        onSelect={(mealPlan) => navigate(`/mealplans/${mealPlan.id}`)}
      />
    </div>
  );
}

// Generic Stat Card
function StatCard({ title, value, color }: { title: string; value: number; color: string }) {
  return (
    <div className={`bg-${color}-500 text-white p-4 rounded-xl shadow`}>
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}

// Generic ItemList: works for clients, meal plans, etc.
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
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <ul className="divide-y divide-gray-200 max-h-80 overflow-y-auto">
        {items.length === 0 && (
          <li className="p-2 text-gray-500 text-sm text-center">No {title.toLowerCase()} found.</li>
        )}
        {items.map((item, idx) => {
          const id = item._id || item.id || idx;
          return (
            <li
              key={id}
              onClick={() => onSelect(item)}
              className="flex flex-col p-2 rounded-md cursor-pointer hover:bg-gray-100"
            >
              {fields.map((field) => (
                <span key={String(field)} className="text-gray-700 text-sm">
                  <strong>{String(field)}:</strong> {item[field] ?? "No data"}
                </span>
              ))}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
