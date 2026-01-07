// // pages/Clients.tsx
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getNutritionistProfile } from "../../services/nutritionistService";

// interface CLientUser {
//  name: string,
//   email: string,
// }

// type Client = {
//   id: string;
//   name: string;
//   age?: number;
//   healthGoal?: string;
//   userId: string;
//   assignedNutritionistId: string;
//   subscription?: any;
//   user: CLientUser
// };

// type NutritionistProfile = {
//   certification?: string;
//   experienceYears?: number;
//   clients: Client[];
// };

// type NutritionistData = {
//   id: string;
//   name: string;
//   email: string;
//   profile: NutritionistProfile;
// };

// const NutritionistClients: React.FC = () => {
//   const [clients, setClients] = useState<Client[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchClients = async () => {
//       try {
//         const data: NutritionistData = await getNutritionistProfile();
//         if (data?.profile?.clients) {
//           setClients(data.profile.clients);
//         } else {
//           setClients([]);
//         }
//       } catch (err) {
//         console.error("Failed to fetch clients:", err);
//         setError("Failed to load clients");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchClients();
//   }, []);

//   const handleCreateMealPlan = (clientId: string, clientName: string) => {
//     const encodedName = encodeURIComponent(clientName);
//     navigate(`/nutritionist/create-mealplan/${clientId}/${encodedName}`);
//   };

//   if (loading) return <p>Loading clients...</p>;
//   if (error) return <p className="text-red-600">{error}</p>;
//   if (clients.length === 0) return <p>No clients assigned yet.</p>;

//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">My Clients</h1>
//       <ul className="space-y-2">
//         {clients.map((client) => (
//           <li
//             key={client.id}
//             className="flex justify-between items-center p-3 border rounded"
//           >
//             <div>
//               <p><strong>Name:</strong> {client.user.name}</p>
//               <p><strong>Age:</strong> {client.age || "N/A"}</p>
//               <p><strong>Health Goal:</strong> {client.healthGoal || "N/A"}</p>
//             </div>
//             <button
//               onClick={() => handleCreateMealPlan(client.id, client.user.name)}
//               className="px-3 py-1 bg-green-600 text-white rounded"
//             >
//               Create Meal Plan
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default NutritionistClients;























// pages/Clients.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getNutritionistProfile } from "../../services/nutritionistService";

interface ClientUser {
  name: string;
  email: string;
}

type Client = {
  id: string;
  name: string;
  age?: number;
  healthGoal?: string;
  userId: string;
  assignedNutritionistId: string;
  subscription?: any;
  user: ClientUser;
};

type NutritionistProfile = {
  certification?: string;
  experienceYears?: number;
  clients: Client[];
};

type NutritionistData = {
  id: string;
  name: string;
  email: string;
  profile: NutritionistProfile;
};

const NutritionistClients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data: NutritionistData = await getNutritionistProfile();
        if (data?.profile?.clients) {
          setClients(data.profile.clients);
        } else {
          setClients([]);
        }
      } catch (err) {
        console.error("Failed to fetch clients:", err);
        setError("Failed to load clients");
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleCreateMealPlan = (clientId: string, clientName: string) => {
    const encodedName = encodeURIComponent(clientName);
    navigate(`/nutritionist/create-mealplan/${clientId}/${encodedName}`);
  };

  if (loading) return <p className="p-6 text-gray-500">Loading clients...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;
  if (clients.length === 0) return <p className="p-6 text-gray-500">No clients assigned yet.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">My Clients</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => (
          <div
            key={client.id}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-200 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <p className="text-lg font-semibold text-gray-800">{client.user.name}</p>
              <p className="text-gray-500 text-sm"><strong>Age:</strong> {client.age ?? "N/A"}</p>
              <p className="text-gray-500 text-sm"><strong>Health Goal:</strong> {client.healthGoal ?? "N/A"}</p>
              <p className="text-gray-500 text-sm"><strong>Email:</strong> {client.user.email ?? "N/A"}</p>
            </div>

            <button
              onClick={() => handleCreateMealPlan(client.id, client.user.name)}
              className="mt-4 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl shadow-md hover:from-green-600 hover:to-green-700 transition-colors duration-200"
            >
              Create Meal Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NutritionistClients;
