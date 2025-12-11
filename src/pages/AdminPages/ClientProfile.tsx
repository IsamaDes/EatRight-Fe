
// // // // import { useEffect, useState } from "react";
// // // // import { useParams } from "react-router-dom";
// // // // import { ToastContainer, toast } from "react-toastify";
// // // // import 'react-toastify/dist/ReactToastify.css';
// // // // import { assignNutritionist, getAdminDashboard, getClientProfile,  } from "../../services/adminService";

// // // // interface Client {
// // // //   id: string;
// // // //   name: string;
// // // //   email: string;
// // // //   createdAt: string;
// // // //   assignedNutritionist?: {
// // // //     id: string;
// // // //     name: string;
// // // //   } | null;
// // // // }

// // // // interface ClientProfileResponse {
// // // //   client: Client;
// // // //   profile: {
// // // //     healthGoal?: string;
// // // //     age?: number;
// // // //     subscription?: string | null;
// // // //   };
// // // //   mealPlans: {
// // // //     _id: string;
// // // //     title: string;
// // // //     description?: string;
// // // //   }[];
// // // // }

// // // // interface Nutritionist {
// // // //   _id: string;
// // // //   name: string;
// // // //   email: string;
// // // //   createdAt: string;
// // // // }

// // // // export default function ClientProfilePage() {
// // // //   const { clientId } = useParams();

// // // //     const [nutritions, setNutritions] = useState<[]>([]);
// // // //     const [filteredNutritionists, setFilteredNutritionists] = useState<[]>([]);

// // // //   const [loading, setLoading] = useState(true);
// // // //   const [profileData, setProfileData] = useState<ClientProfileResponse | null>(null);
// // // //   const [nutritionists, setNutritionists] = useState<Nutritionist[]>([]);
// // // //   const [selectedNutritionist, setSelectedNutritionist] = useState<string>("");




// // // //   useEffect(() => {
// // // //     const fetchData = async () => {
// // // //       if (!clientId) return;

// // // //       try {
// // // //         // Fetch client profile
// // // //         const res = await getClientProfile(clientId);
// // // //         setProfileData(res.data);

// // // //         // Fetch list of nutritionists
// // // //        const resNutri = await getAdminDashboard();
// // // // console.log(resNutri); // this will show the dashboard object
// // // // setNutritionists(resNutri.nutritionist ?? []);

// // // //         // Preselect currently assigned nutritionist
// // // //         setSelectedNutritionist(res.data.client.assignedNutritionist?.id || "");
// // // //         toast.success("Data loaded successfully!");
// // // //       } catch (err: any) {
// // // //         toast.error(err?.message || "Failed to load data");
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     fetchData();
// // // //   }, [clientId]);

// // // //   if (loading) return <div className="text-center mt-20">Loading...</div>;
// // // //   if (!profileData || !profileData.client) return <div>Client not found</div>;

// // // //   const { client, mealPlans, profile } = profileData;

// // // //   const handleAssignNutritionist = async (nutritionistId: string) => {
// // // //     try {
// // // //       const res = await assignNutritionist(client.id, nutritionistId);
// // // //       setProfileData(prev => prev ? { ...prev, client: { ...prev.client, assignedNutritionist: res.data } } : prev);
// // // //       setSelectedNutritionist(nutritionistId);
// // // //       toast.success(`Assigned ${res.data.name} to ${client.name}`);
// // // //     } catch (err: any) {
// // // //       toast.error(err?.message || "Failed to assign nutritionist");
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="p-6 max-w-3xl mx-auto space-y-6">
// // // //       <ToastContainer />

// // // //       {/* Basic Info */}
// // // //       <div className="bg-white rounded-xl shadow-md p-6 space-y-2">
// // // //         <h2 className="text-xl font-semibold text-gray-700 mb-2">Client Info</h2>
// // // //         <p><strong>Name:</strong> {client.name}</p>
// // // //         <p><strong>Email:</strong> {client.email}</p>
// // // //         <p><strong>Assigned Nutritionist:</strong> {client.assignedNutritionist?.name || "Unassigned"}</p>
// // // //       </div>

// // // //       {/* Nutritionists List */}
// // // //       <div className="bg-white rounded-xl shadow-md p-6">
// // // //         <h2 className="text-xl font-semibold text-gray-700 mb-3">Assign Nutritionist</h2>

// // // //         {nutritionists.length === 0 ? (
// // // //           <p className="text-gray-500">No nutritionists available.</p>
// // // //         ) : (
// // // //           <ul className="divide-y divide-gray-200 max-h-72 overflow-y-auto">
// // // //             {nutritionists.map(n => (
// // // //               <li
// // // //                 key={n._id}
// // // //                 className={`flex justify-between items-center p-3 cursor-pointer rounded-lg transition ${
// // // //                   selectedNutritionist === n._id ? "bg-green-100 shadow-inner" : "hover:bg-gray-50"
// // // //                 }`}
// // // //                 onClick={() => handleAssignNutritionist(n._id)}
// // // //               >
// // // //                 <div>
// // // //                   <p className="font-medium text-gray-800">{n.name}</p>
// // // //                   <p className="text-sm text-gray-500">{n.email}</p>
// // // //                 </div>
// // // //                 {selectedNutritionist === n._id && (
// // // //                   <span className="px-2 py-1 text-xs font-medium bg-green-200 text-green-800 rounded-full">
// // // //                     Assigned
// // // //                   </span>
// // // //                 )}
// // // //               </li>
// // // //             ))}
// // // //           </ul>
// // // //         )}
// // // //       </div>

// // // //       {/* Meal Plans */}
// // // //       <div className="bg-white rounded-xl shadow-md p-6">
// // // //         <h2 className="text-xl font-semibold mb-3">Meal Plans</h2>
// // // //         {mealPlans.length === 0 ? (
// // // //           <p>No meal plans available.</p>
// // // //         ) : (
// // // //           <ul className="space-y-2">
// // // //             {mealPlans.map(plan => (
// // // //               <li key={plan._id} className="p-2 border rounded-lg">
// // // //                 <p>{plan.title}</p>
// // // //                 <p className="text-sm text-gray-500">{plan.description || "No description"}</p>
// // // //               </li>
// // // //             ))}
// // // //           </ul>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }





// // // import { useEffect, useState } from "react";
// // // import { useParams } from "react-router-dom";
// // // import { ToastContainer, toast } from "react-toastify";
// // // import 'react-toastify/dist/ReactToastify.css';
// // // import { assignNutritionist, getAdminDashboard, getClientProfile } from "../../services/adminService";

// // // interface Client {
// // //   id: string;
// // //   name: string;
// // //   email: string;
// // //   createdAt: string;
// // //   assignedNutritionist?: {
// // //     _id: string;
// // //     name: string;
// // //   } | null;
// // // }

// // // interface ClientProfileResponse {
// // //   client: Client;
// // //   profile: {
// // //     healthGoal?: string;
// // //     age?: number;
// // //     subscription?: string | null;
// // //   };
// // //   mealPlans: {
// // //     _id: string;
// // //     title: string;
// // //     description?: string;
// // //   }[];
// // // }

// // // interface Nutritionist {
// // //   id: string;
// // //   name: string;
// // //   email: string;
// // //   createdAt: string;
// // // }

// // // export default function ClientProfilePage() {
// // //   const { clientId } = useParams<{ clientId: string }>();
// // //   const [loading, setLoading] = useState(true);
// // //   const [profileData, setProfileData] = useState<ClientProfileResponse | null>(null);
// // //   const [nutritionists, setNutritionists] = useState<Nutritionist[]>([]);
// // //   const [selectedNutritionist, setSelectedNutritionist] = useState<string>("");

// // //   useEffect(() => {
// // //     const fetchData = async () => {
// // //       if (!clientId) return;

// // //       try {
// // //         // 1️⃣ Fetch client profile
// // //         const clientRes = await getClientProfile(clientId);
// // //         setProfileData(clientRes.data);

// // //         // 2️⃣ Fetch all nutritionists from dashboard
// // //         const dashboardRes = await getAdminDashboard();
// // //         setNutritionists(dashboardRes.nutritionist ?? []);

// // //         // 3️⃣ Pre-select assigned nutritionist if exists
// // //         setSelectedNutritionist(clientRes.data.client.assignedNutritionist?._id || "");

// // //         toast.success("Client data and nutritionists loaded!");
// // //       } catch (err: any) {
// // //         toast.error(err?.message || "Failed to load data");
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchData();
// // //   }, [clientId]);

// // //   if (loading) return <div className="text-center mt-20">Loading...</div>;
// // //   if (!profileData || !profileData.client) return <div>Client not found</div>;

// // //   const { client, mealPlans } = profileData;

// // //  const handleAssignNutritionist = async (nutritionistId: string) => {
// // //   if (!client.id || !nutritionistId) {
// // //     toast.error("Client ID or Nutritionist ID is missing!");
// // //     return;
// // //   }

// // //   try {
// // //     const res = await assignNutritionist(client.id, nutritionistId);
// // //     setProfileData(prev => prev ? {
// // //       ...prev,
// // //       client: { ...prev.client, assignedNutritionist: res }
// // //     } : prev);
// // //     setSelectedNutritionist(nutritionistId);
// // //     toast.success(`Assigned ${res.name} to ${client.name}`);
// // //   } catch (err: any) {
// // //     toast.error(err?.message || "Failed to assign nutritionist");
// // //   }
// // // };


// // //   return (
// // //     <div className="p-6 max-w-3xl mx-auto space-y-6">
// // //       <ToastContainer />

// // //       {/* Client Info */}
// // //       <div className="bg-white rounded-xl shadow-md p-6 space-y-2">
// // //         <h2 className="text-xl font-semibold text-gray-700 mb-2">Client Info</h2>
// // //         <p><strong>Name:</strong> {client.name}</p>
// // //         <p><strong>Email:</strong> {client.email}</p>
// // //         <p><strong>Joined:</strong> {new Date(client.createdAt).toLocaleDateString()}</p>
// // //         <p><strong>Assigned Nutritionist:</strong> {client.assignedNutritionist?.name || "Unassigned"}</p>
// // //       </div>

// // //       {/* Assign Nutritionist */}
// // //       <div className="bg-white rounded-xl shadow-md p-6">
// // //         <h2 className="text-xl font-semibold text-gray-700 mb-3">Assign Nutritionist</h2>

// // //         {nutritionists.length === 0 ? (
// // //           <p className="text-gray-500">No nutritionists available.</p>
// // //         ) : (
// // //           <ul className="divide-y divide-gray-200 max-h-72 overflow-y-auto">
// // //             {nutritionists.map(n => (
// // //               <li
// // //                 key={n.id}
// // //                 className={`flex justify-between items-center p-3 cursor-pointer rounded-lg transition ${
// // //                   selectedNutritionist === n.id ? "bg-green-100 shadow-inner" : "hover:bg-gray-50"
// // //                 }`}
// // //                 onClick={() => handleAssignNutritionist(n.id)}
// // //               >
// // //                 <div>
// // //                   <p className="font-medium text-gray-800">{n.name}</p>
// // //                   <p className="text-sm text-gray-500">{n.email}</p>
// // //                 </div>
// // //                 {selectedNutritionist === n.id && (
// // //                   <span className="px-2 py-1 text-xs font-medium bg-green-200 text-green-800 rounded-full">
// // //                     Assigned
// // //                   </span>
// // //                 )}
// // //               </li>
// // //             ))}
// // //           </ul>
// // //         )}
// // //       </div>

// // //       {/* Meal Plans */}
// // //       <div className="bg-white rounded-xl shadow-md p-6">
// // //         <h2 className="text-xl font-semibold mb-3">Meal Plans</h2>
// // //         {mealPlans.length === 0 ? (
// // //           <p>No meal plans available.</p>
// // //         ) : (
// // //           <ul className="space-y-2">
// // //             {mealPlans.map(plan => (
// // //               <li key={plan._id} className="p-2 border rounded-lg">
// // //                 <p>{plan.title}</p>
// // //                 <p className="text-sm text-gray-500">{plan.description || "No description"}</p>
// // //               </li>
// // //             ))}
// // //           </ul>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }





// // import { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import { ToastContainer, toast } from "react-toastify";
// // import 'react-toastify/dist/ReactToastify.css';
// // import { assignNutritionist, getAdminDashboard, getClientProfile } from "../../services/adminService";

// // interface Client {
// //   id: string;
// //   name: string;
// //   email: string;
// //   createdAt: string;
// //   assignedNutritionist?: {
// //     id: string;
// //     name: string;
// //   } | null;
// // }

// // interface ClientProfileResponse {
// //   client: Client;
// //   profile: {
// //     healthGoal?: string;
// //     age?: number;
// //     subscription?: string | null;
// //   };
// //   mealPlans: {
// //     id: string;
// //     title: string;
// //     description?: string;
// //   }[];
// // }

// // interface Nutritionist {
// //   _id: string;
// //   name: string;
// //   email: string;
// //   createdAt: string;
// // }

// // export default function ClientProfilePage() {
// //   const { clientId } = useParams();

// //   const [loading, setLoading] = useState(true);
// //   const [profileData, setProfileData] = useState<ClientProfileResponse | null>(null);
// //   const [nutritionists, setNutritionists] = useState<Nutritionist[]>([]);
// //   const [selectedNutritionist, setSelectedNutritionist] = useState<string>("");

// // useEffect(() => {
// //   const fetchData = async () => {
// //     if (!clientId) return;

// //     try {
// //       // Fetch client profile
// //       const resProfile = await getClientProfile(clientId);
// //       setProfileData(resProfile.data);

// //       // Fetch dashboard for nutritionists
// //       const resDashboard = await getAdminDashboard();
// //       console.log(resDashboard); // shows nutritionist array
// //       setNutritionists(resDashboard.nutritionist ?? []);

// //       // Preselect currently assigned nutritionist
// //       setSelectedNutritionist(resProfile.data.client.assignedNutritionist?._id || "");

// //       toast.success("Data loaded successfully!");
// //     } catch (err: any) {
// //       toast.error(err?.message || "Failed to load data");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   fetchData();
// // }, [clientId]);


// //   if (loading) return <div className="text-center mt-20">Loading...</div>;
// //   if (!profileData || !profileData.client) return <div>Client not found</div>;

// //   const { client, mealPlans } = profileData;

// //   // Assign nutritionist to client
// // const handleAssignNutritionist = async (nutritionistId: string) => {
// //   if (!client.id || !nutritionistId) return toast.error("Client or Nutritionist missing");
// //   const res = await assignNutritionist(client.id, nutritionistId); 
// //   setSelectedNutritionist(nutritionistId);
// //   setProfileData(prev => prev ? { ...prev, client: { ...prev.client, assignedNutritionist: res.data } } : prev);
// // };

// //   return (
// //     <div className="p-6 max-w-3xl mx-auto space-y-6">
// //       <ToastContainer />

// //       {/* Client Info */}
// //       <div className="bg-white rounded-xl shadow-md p-6 space-y-2">
// //         <h2 className="text-xl font-semibold text-gray-700 mb-2">Client Info</h2>
// //         <p><strong>Name:</strong> {client.name}</p>
// //         <p><strong>Email:</strong> {client.email}</p>
// //         <p><strong>Joined:</strong> {new Date(client.createdAt).toLocaleDateString()}</p>
// //         <p>
// //           <strong>Assigned Nutritionist:</strong> {client.assignedNutritionist?.name || "Unassigned"}
// //         </p>
// //       </div>

// //       {/* Nutritionist List */}
// //       <div className="bg-white rounded-xl shadow-md p-6">
// //         <h2 className="text-xl font-semibold text-gray-700 mb-3">Assign Nutritionist</h2>
// //         {nutritionists.length === 0 ? (
// //           <p className="text-gray-500">No nutritionists available.</p>
// //         ) : (
// //           <ul className="divide-y divide-gray-200 max-h-72 overflow-y-auto">
// //             {nutritionists.map(n => (
// //               <li
// //                 key={n._id}
// //                 className={`flex justify-between items-center p-3 cursor-pointer rounded-lg transition ${
// //                   selectedNutritionist === n._id ? "bg-green-100 shadow-inner" : "hover:bg-gray-50"
// //                 }`}
// //                 onClick={() => handleAssignNutritionist(n._id)}
// //               >
// //                 <div>
// //                   <p className="font-medium text-gray-800">{n.name}</p>
// //                   <p className="text-sm text-gray-500">{n.email}</p>
// //                 </div>
// //                 {selectedNutritionist === n._id && (
// //                   <span className="px-2 py-1 text-xs font-medium bg-green-200 text-green-800 rounded-full">
// //                     Assigned
// //                   </span>
// //                 )}
// //               </li>
// //             ))}
// //           </ul>
// //         )}
// //       </div>

// //       {/* Meal Plans */}
// //       <div className="bg-white rounded-xl shadow-md p-6">
// //         <h2 className="text-xl font-semibold mb-3">Meal Plans</h2>
// //         {mealPlans.length === 0 ? (
// //           <p>No meal plans available.</p>
// //         ) : (
// //           <ul className="space-y-2">
// //             {mealPlans.map(plan => (
// //               <li key={plan.id} className="p-2 border rounded-lg">
// //                 <p>{plan.title}</p>
// //                 <p className="text-sm text-gray-500">{plan.description || "No description"}</p>
// //               </li>
// //             ))}
// //           </ul>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }





// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import { getAdminDashboard, getClientProfile, assignNutritionist } from "../../services/adminService";

// interface Client {
//   id: string;
//   name: string;
//   email: string;
//   createdAt: string;
//   assignedNutritionist?: {
//     id: string;
//     user: { name: string; email: string };
//   } | null;
// }

// interface ClientProfileResponse {
//   client: Client;
//   profile: {
//     healthGoal?: string;
//     age?: number;
//     subscription?: string | null;
//   };
//   mealPlans: {
//     id: string;
//     title: string;
//     description?: string;
//   }[];
// }

// interface Nutritionist {
//   id: string;
//   name: string;
//   email: string;
//   createdAt: string;
// }

// export default function ClientProfilePage() {
//   const { clientId } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [profileData, setProfileData] = useState<ClientProfileResponse | null>(null);
//   const [nutritionists, setNutritionists] = useState<Nutritionist[]>([]);
//   const [selectedNutritionist, setSelectedNutritionist] = useState<string>("");

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!clientId) return;
//       try {
//         // Fetch client profile
//         const res = await getClientProfile(clientId);
//         setProfileData(res.data);

//         // Fetch all nutritionists from dashboard
//         const resNutri = await getAdminDashboard();
//         setNutritionists(resNutri.nutritionist ?? []);
//         console.log(resNutri)

//         // Preselect assigned nutritionist
//         setSelectedNutritionist(res.data.client.assignedNutritionist?.id || "");
//         toast.success("Data loaded successfully!");
//       } catch (err: any) {
//         toast.error(err?.message || "Failed to load data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [clientId]);

//   if (loading) return <div className="text-center mt-20">Loading...</div>;
//   if (!profileData || !profileData.client) return <div>Client not found</div>;

//   const { client, mealPlans, profile } = profileData;

//   const handleAssignNutritionist = async (nutritionistId: string) => {
//     if (!client.id || !nutritionistId) {
//       toast.error("Client ID or Nutritionist ID is missing!");
//       return;
//     }

//     try {
//       const updatedClient = await assignNutritionist(client.id, nutritionistId);

//       setProfileData(prev => prev
//         ? { ...prev, client: { ...prev.client, assignedNutritionist: updatedClient.assignedNutritionist } }
//         : prev
//       );

//       setSelectedNutritionist(nutritionistId);
//       toast.success(`Assigned ${updatedClient.assignedNutritionist?.user.name} to ${client.name}`);
//     } catch (err: any) {
//       toast.error(err?.message || "Failed to assign nutritionist");
//     }
//   };

//   return (
//     <div className="p-6 max-w-3xl mx-auto space-y-6">
//       <ToastContainer />

//       {/* Client Info */}
//       <div className="bg-white rounded-xl shadow-md p-6 space-y-2">
//         <h2 className="text-xl font-semibold text-gray-700 mb-2">Client Info</h2>
//         <p><strong>Name:</strong> {client.name}</p>
//         <p><strong>Email:</strong> {client.email}</p>
//         <p><strong>Joined:</strong> {new Date(client.createdAt).toLocaleDateString()}</p>
//         <p><strong>Assigned Nutritionist:</strong> {client.assignedNutritionist?.user.name || "Unassigned"}</p>
//       </div>

//       {/* Nutritionist List */}
//       <div className="bg-white rounded-xl shadow-md p-6">
//         <h2 className="text-xl font-semibold text-gray-700 mb-3">Assign Nutritionist</h2>
//         {nutritionists.length === 0 ? (
//           <p className="text-gray-500">No nutritionists available.</p>
//         ) : (
//           <ul className="divide-y divide-gray-200 max-h-72 overflow-y-auto">
//             {nutritionists.map(n => (
//               <li
//                 key={n.id}
//                 className={`flex justify-between items-center p-3 cursor-pointer rounded-lg transition ${
//                   selectedNutritionist === n.id ? "bg-green-100 shadow-inner" : "hover:bg-gray-50"
//                 }`}
//                 onClick={() => handleAssignNutritionist(n.id)}
//               >
//                 <div>
//                   <p className="font-medium text-gray-800">{n.name}</p>
//                   <p className="text-sm text-gray-500">{n.email}</p>
//                 </div>
//                 {selectedNutritionist === n.id && (
//                   <span className="px-2 py-1 text-xs font-medium bg-green-200 text-green-800 rounded-full">
//                     Assigned
//                   </span>
//                 )}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Meal Plans */}
//       <div className="bg-white rounded-xl shadow-md p-6">
//         <h2 className="text-xl font-semibold mb-3">Meal Plans</h2>
//         {mealPlans.length === 0 ? (
//           <p>No meal plans available.</p>
//         ) : (
//           <ul className="space-y-2">
//             {mealPlans.map(plan => (
//               <li key={plan.id} className="p-2 border rounded-lg">
//                 <p>{plan.title}</p>
//                 <p className="text-sm text-gray-500">{plan.description || "No description"}</p>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }




import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getAdminDashboard, getClientProfile, assignNutritionist } from "../../services/adminService";

interface Client {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  assignedNutritionist?: {
    id: string;
    user: { name: string; email: string };
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
    id: string;
    title: string;
    description?: string;
  }[];
}

interface Nutritionist {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export default function ClientProfilePage() {
  const { clientId } = useParams();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<ClientProfileResponse | null>(null);
  const [nutritionists, setNutritionists] = useState<Nutritionist[]>([]);
  const [selectedNutritionist, setSelectedNutritionist] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      if (!clientId) return;

      try {
        // 1️⃣ Fetch client profile
        const resProfile = await getClientProfile(clientId);
        setProfileData(resProfile.data);

        // 2️⃣ Fetch dashboard to get nutritionists only
        const resDashboard = await getAdminDashboard();
        console.log(resDashboard)
        setNutritionists(resDashboard.nutritionist ?? []);

        // 3️⃣ Preselect assigned nutritionist if exists
        setSelectedNutritionist(resProfile.data.client.assignedNutritionist?.id || "");

        toast.success("Client and nutritionist data loaded successfully!");
      } catch (err: any) {
        toast.error(err?.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [clientId]);

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (!profileData || !profileData.client) return <div>Client not found</div>;

  const { client, mealPlans } = profileData;

  // Assign a nutritionist to the client
  const handleAssignNutritionist = async (nutritionistId: string) => {
    if (!client.id || !nutritionistId) {
      toast.error("Client ID or Nutritionist ID is missing!");
      return;
    }

    try {
      const updatedClient = await assignNutritionist(client.id, nutritionistId);

      // Ensure we update the client.assignedNutritionist with the correct nutritionist object
      setProfileData(prev =>
        prev
          ? {
              ...prev,
              client: {
                ...prev.client,
                assignedNutritionist: updatedClient.assignedNutritionist,
              },
            }
          : prev
      );

      setSelectedNutritionist(nutritionistId);
      toast.success(`Assigned ${updatedClient.assignedNutritionist?.user.name} to ${client.name}`);
    } catch (err: any) {
      toast.error(err?.message || "Failed to assign nutritionist");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <ToastContainer />

      {/* Client Info */}
      <div className="bg-white rounded-xl shadow-md p-6 space-y-2">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Client Info</h2>
        <p><strong>Name:</strong> {client.name}</p>
        <p><strong>Email:</strong> {client.email}</p>
        <p><strong>Joined:</strong> {new Date(client.createdAt).toLocaleDateString()}</p>
        <p><strong>Assigned Nutritionist:</strong> {client.assignedNutritionist?.user.name || "Unassigned"}</p>
      </div>

      {/* Nutritionist List */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Assign Nutritionist</h2>
        {nutritionists.length === 0 ? (
          <p className="text-gray-500">No nutritionists available.</p>
        ) : (
          <ul className="divide-y divide-gray-200 max-h-72 overflow-y-auto">
            {nutritionists.map(n => (
              <li
                key={n.id}
                className={`flex justify-between items-center p-3 cursor-pointer rounded-lg transition ${
                  selectedNutritionist === n.id ? "bg-green-100 shadow-inner" : "hover:bg-gray-50"
                }`}
                onClick={() => handleAssignNutritionist(n.id)}
              >
                <div>
                  <p className="font-medium text-gray-800">{n.name}</p>
                  <p className="text-sm text-gray-500">{n.email}</p>
                </div>
                {selectedNutritionist === n.id && (
                  <span className="px-2 py-1 text-xs font-medium bg-green-200 text-green-800 rounded-full">
                    Assigned
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Meal Plans */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-3">Meal Plans</h2>
        {mealPlans.length === 0 ? (
          <p>No meal plans available.</p>
        ) : (
          <ul className="space-y-2">
            {mealPlans.map(plan => (
              <li key={plan.id} className="p-2 border rounded-lg">
                <p>{plan.title}</p>
                <p className="text-sm text-gray-500">{plan.description || "No description"}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
