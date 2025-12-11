// // pages/ClientsPage.tsx
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getAdminDashboard } from "../../services/adminService";
// import { toast, ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import { 
//   UserGroupIcon, 
//   MagnifyingGlassIcon,
//   FunnelIcon 
// } from '@heroicons/react/24/outline';

// interface UserData {
//   id: string;
//   name: string;
//   email: string;
//   createdAt: string;
//   assignedNutritionist?: string | null;
// }

// export default function ClientsPage() {
//   const [clients, setClients] = useState<UserData[]>([]);
//   const [filteredClients, setFilteredClients] = useState<UserData[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterStatus, setFilterStatus] = useState<"all" | "assigned" | "unassigned">("all");
  
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchClients = async () => {
//       try {
//         const res = await getAdminDashboard();
//         console.log("Clients fetched:", res.clients);
//         setClients(res.clients);
//         setFilteredClients(res.clients);
//         toast.success("Clients loaded successfully!");
//       } catch {
//         toast.error("Failed to load clients");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchClients();
//   }, []);

//   // Filter clients based on search query and filter status
//   useEffect(() => {
//     let filtered = clients;

//     // Filter by assignment status
//     if (filterStatus === "assigned") {
//       filtered = filtered.filter(client => client.assignedNutritionist);
//     } else if (filterStatus === "unassigned") {
//       filtered = filtered.filter(client => !client.assignedNutritionist);
//     }

//     // Filter by search query
//     if (searchQuery) {
//       filtered = filtered.filter(
//         client =>
//           client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           client.email.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     setFilteredClients(filtered);
//   }, [searchQuery, filterStatus, clients]);

//   const handleClientClick = (clientId: string) => {
//     navigate(`/admin/clients-profile/${clientId}`);
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 space-y-6">
//       <ToastContainer />

//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-3">
//           <div className="bg-green-100 p-3 rounded-lg">
//             <UserGroupIcon className="w-8 h-8 text-green-600" />
//           </div>
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800">Clients</h1>
//             <p className="text-gray-500">
//               {filteredClients.length} of {clients.length} clients
//             </p>
//           </div>
//         </div>

//         <button
//           onClick={() => navigate("/admin")}
//           className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition"
//         >
//           ← Back to Dashboard
//         </button>
//       </div>

//       {/* Search and Filter Bar */}
//       <div className="bg-white rounded-xl shadow-md p-4 space-y-4">
//         <div className="flex flex-col lg:flex-row gap-4">
//           {/* Search Input */}
//           <div className="flex-1 relative">
//             <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
//             <input
//               type="text"
//               placeholder="Search by name or email..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//             />
//           </div>

//           {/* Filter Dropdown */}
//           <div className="relative">
//             <FunnelIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
//             <select
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value as "all" | "assigned" | "unassigned")}
//               className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none cursor-pointer"
//             >
//               <option value="all">All Clients</option>
//               <option value="assigned">Assigned</option>
//               <option value="unassigned">Unassigned</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Clients List */}
//       <div className="bg-white rounded-xl shadow-md overflow-hidden">
//         {filteredClients.length === 0 ? (
//           <div className="text-center py-16">
//             <UserGroupIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//             <p className="text-gray-500 text-lg">
//               {searchQuery || filterStatus !== "all"
//                 ? "No clients found matching your criteria"
//                 : "No clients available"}
//             </p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50 border-b border-gray-200">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Client
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Email
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Joined
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Action
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {filteredClients.map((client) => (
//                   <tr
//                     key={client.id}
//                     className="hover:bg-gray-50 transition cursor-pointer"
//                     onClick={() => handleClientClick(client.id)}
//                   >
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center space-x-3">
//                         <div className="bg-green-100 rounded-full w-10 h-10 flex items-center justify-center">
//                           <span className="text-green-600 font-semibold text-sm">
//                             {client.name.charAt(0).toUpperCase()}
//                           </span>
//                         </div>
//                         <div>
//                           <p className="font-medium text-gray-800">{client.name}</p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <p className="text-sm text-gray-600">{client.email}</p>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {client.assignedNutritionist ? (
//                         <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
//                           Assigned
//                         </span>
//                       ) : (
//                         <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
//                           Unassigned
//                         </span>
//                       )}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <p className="text-sm text-gray-500">
//                         {new Date(client.createdAt).toLocaleDateString("en-US", {
//                           year: "numeric",
//                           month: "short",
//                           day: "numeric",
//                         })}
//                       </p>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleClientClick(client.id);
//                         }}
//                         className="text-green-600 hover:text-green-800 font-medium text-sm transition"
//                       >
//                         View Profile →
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




// pages/ClientsPage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminDashboard } from "../../services/adminService";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { 
  UserGroupIcon, 
  MagnifyingGlassIcon,
  FunnelIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline';

interface UserData {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  nutritionistProfileId?: string | null;
}

export default function ClientsPage() {
  const [clients, setClients] = useState<UserData[]>([]);
  const [filteredClients, setFilteredClients] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "assigned" | "unassigned">("all");
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await getAdminDashboard();
        console.log("Clients fetched:", res.clients);
        setClients(res.clients);
        setFilteredClients(res.clients);
        toast.success("Clients loaded successfully!");
      } catch {
        toast.error("Failed to load clients");
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  // Filter clients based on search query and filter status
  useEffect(() => {
    let filtered = clients;

    // Filter by assignment status
    if (filterStatus === "assigned") {
      filtered = filtered.filter(client => client.nutritionistProfileId);
    } else if (filterStatus === "unassigned") {
      filtered = filtered.filter(client => !client.nutritionistProfileId);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        client =>
          client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          client.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredClients(filtered);
  }, [searchQuery, filterStatus, clients]);

  const handleClientClick = (clientId: string) => {
    navigate(`/admin/clients-profile/${clientId}`);
  };

  const handleAssignNutritionist = (e: React.MouseEvent, clientId: string) => {
    e.stopPropagation();
    navigate(`/admin/assign-nutritionist/${clientId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <ToastContainer />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-green-100 p-3 rounded-lg">
            <UserGroupIcon className="w-8 h-8 text-green-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Clients</h1>
            <p className="text-gray-500">
              {filteredClients.length} of {clients.length} clients
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/admin")}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-md p-4 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <FunnelIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as "all" | "assigned" | "unassigned")}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none cursor-pointer"
            >
              <option value="all">All Clients</option>
              <option value="assigned">Assigned</option>
              <option value="unassigned">Unassigned</option>
            </select>
          </div>
        </div>
      </div>

      {/* Clients List */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {filteredClients.length === 0 ? (
          <div className="text-center py-16">
            <UserGroupIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              {searchQuery || filterStatus !== "all"
                ? "No clients found matching your criteria"
                : "No clients available"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredClients.map((client) => (
                  <tr
                    key={client.id}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="bg-green-100 rounded-full w-10 h-10 flex items-center justify-center">
                          <span className="text-green-600 font-semibold text-sm">
                            {client.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{client.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-600">{client.email}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {client.nutritionistProfileId ? (
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          Assigned
                        </span>
                      ) : (
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                          Unassigned
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-500">
                        {new Date(client.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleClientClick(client.id)}
                          className="text-green-600 hover:text-green-800 font-medium text-sm transition"
                        >
                          View Profile
                        </button>
                        <button
                          onClick={(e) => handleAssignNutritionist(e, client.id)}
                          className="flex items-center space-x-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition"
                        >
                          <UserPlusIcon className="w-4 h-4" />
                          <span>Assign</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}