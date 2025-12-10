// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import { getClientProfile } from "../../services/adminService";

// interface Client {
//   _id: string;
//   name: string;
//   email: string;
//   createdAt: string;
//   assignedNutritionist?: {
//     _id: string;
//     name: string;
//   } | null;
// }

// interface ClientProfileResponse {
//   client: Client;
//   mealPlans: any[];
//   statistics: {
//     totalMealPlans: number;
//     totalAppointments: number;
//   };
// }

// export default function ClientProfilePage() {
//   const { clientId } = useParams();
//   const navigate = useNavigate();
  
//   const [loading, setLoading] = useState(true);
//   const [profile, setProfile] = useState<ClientProfileResponse | null>(null);
  

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         if (!clientId) return;

//         const res = await getClientProfile(clientId);
//         setProfile(res.data);
//         toast.success("Client profile loaded");
//       } catch {
//         toast.error("Failed to load client profile");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [clientId]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
//       </div>
//     );
//   }

//   if (!profile || !profile.client) {
//     return (
//       <div className="p-6">
//         <ToastContainer />
//         <p className="text-gray-600">Client not found.</p>
//       </div>
//     );
//   }

//   const { client, mealPlans, statistics } = profile;

//   return (
//     <div className="p-6 space-y-6">
//       <ToastContainer />

//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold text-gray-800">
//           {client.name}'s Profile
//         </h1>

//         <button
//           onClick={() => navigate("/admin/clients")}
//           className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition"
//         >
//           ← Back to Clients
//         </button>
//       </div>

//       {/* Client Info */}
//       <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
//         <h2 className="text-xl font-semibold text-gray-700">Basic Information</h2>

//         <div className="space-y-2">
//           <p><strong>Name:</strong> {client.name}</p>
//           <p><strong>Email:</strong> {client.email}</p>
//           <p><strong>Joined:</strong> {new Date(client.createdAt).toLocaleDateString()}</p>
//           <p>
//             <strong>Assigned Nutritionist:</strong>{" "}
//             {client.assignedNutritionist ? (
//               <span className="text-green-700 font-medium">
//                 {client.assignedNutritionist.name}
//               </span>
//             ) : (
//               <span className="text-red-500">Unassigned</span>
//             )}
//           </p>
//         </div>
//       </div>

//       {/* Statistics */}
//       <div className="bg-white rounded-xl shadow-md p-6">
//         <h2 className="text-xl font-semibold text-gray-700 mb-3">
//           Statistics
//         </h2>

//         <div className="grid grid-cols-2 gap-6">
//           <div className="p-4 bg-green-50 rounded-lg">
//             <p className="text-sm text-gray-500">Total Meal Plans</p>
//             <p className="text-2xl font-bold text-gray-800">{statistics.totalMealPlans}</p>
//           </div>

//           <div className="p-4 bg-green-50 rounded-lg">
//             <p className="text-sm text-gray-500">Appointments</p>
//             <p className="text-2xl font-bold text-gray-800">{statistics.totalAppointments}</p>
//           </div>
//         </div>
//       </div>

//       {/* Meal Plans */}
//       <div className="bg-white rounded-xl shadow-md p-6">
//         <h2 className="text-xl font-semibold text-gray-700 mb-3">
//           Meal Plans
//         </h2>

//         {mealPlans.length === 0 ? (
//           <p className="text-gray-500">No meal plans available.</p>
//         ) : (
//           <ul className="space-y-4">
//             {mealPlans.map((plan: any) => (
//               <li
//                 key={plan._id}
//                 className="p-4 border rounded-lg hover:bg-gray-50 transition"
//               >
//                 <p className="font-medium text-gray-800">{plan.title}</p>
//                 <p className="text-gray-500 text-sm">{plan.description}</p>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }






import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getClientProfile } from "../../services/adminService";

interface Client {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  assignedNutritionist?: {
    _id: string;
    name: string;
  } | null;
}

interface ClientProfileResponse {
  client: Client;
  profile: {
    healthGoal?: string;
    age?: number;
    subscription?: string | null;
  };
  mealPlans: {
    _id: string;
    title: string;
    description?: string;
  }[];
}

export default function ClientProfilePage() {
  const { clientId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<ClientProfileResponse | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!clientId) return;

      try {
        const res = await getClientProfile(clientId);
        setProfileData(res.data);
        toast.success("Client profile loaded");
      } catch (err: any) {
        toast.error(err?.message || "Failed to load client profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [clientId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!profileData || !profileData.client) {
    return (
      <div className="p-6 text-center">
        <ToastContainer />
        <p className="text-red-500 text-lg">Client not found.</p>
        <button
          onClick={() => navigate("/admin/clients")}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Back to Clients
        </button>
      </div>
    );
  }

  const { client, profile, mealPlans } = profileData;

  // Compute statistics
  const statistics = {
    totalMealPlans: mealPlans?.length ?? 0,
    totalAppointments: 0 // add appointment data if available
  };

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <ToastContainer />

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">
          {client.name}'s Profile
        </h1>

        <button
          onClick={() => navigate("/admin/clients")}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition"
        >
          ← Back to Clients
        </button>
      </div>

      {/* Basic Info */}
      <div className="bg-white rounded-xl shadow-md p-6 space-y-2">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Basic Information</h2>

        <p><strong>Name:</strong> {client.name ?? "No data"}</p>
        <p><strong>Email:</strong> {client.email ?? "No data"}</p>
        <p><strong>Joined:</strong> {client.createdAt ? new Date(client.createdAt).toLocaleDateString() : "No data"}</p>
        <p>
          <strong>Assigned Nutritionist:</strong>{" "}
          {client.assignedNutritionist?.name ?? "Unassigned"}
        </p>
        <p><strong>Health Goal:</strong> {profile?.healthGoal ?? "No data"}</p>
        <p><strong>Age:</strong> {profile?.age ?? "No data"}</p>
        <p><strong>Subscription:</strong> {profile?.subscription ?? "No data"}</p>
      </div>

      {/* Statistics */}
      <div className="bg-white rounded-xl shadow-md p-6 grid grid-cols-2 gap-6">
        <div className="p-4 bg-green-50 rounded-lg text-center">
          <p className="text-sm text-gray-500">Total Meal Plans</p>
          <p className="text-2xl font-bold text-gray-800">{statistics.totalMealPlans}</p>
        </div>

        <div className="p-4 bg-green-50 rounded-lg text-center">
          <p className="text-sm text-gray-500">Appointments</p>
          <p className="text-2xl font-bold text-gray-800">{statistics.totalAppointments}</p>
        </div>
      </div>

      {/* Meal Plans */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Meal Plans</h2>

        {mealPlans.length === 0 ? (
          <p className="text-gray-500">No meal plans available.</p>
        ) : (
          <ul className="space-y-4">
            {mealPlans.map(plan => (
              <li key={plan._id} className="p-4 border rounded-lg hover:bg-gray-50 transition">
                <p className="font-medium text-gray-800">{plan.title}</p>
                <p className="text-gray-500 text-sm">{plan.description ?? "No description"}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
