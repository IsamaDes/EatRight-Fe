// pages/AssignNutritionistPage.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAdminDashboard, assignNutritionist } from "../../services/adminService";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { 
  UserGroupIcon, 
  MagnifyingGlassIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import { UserData } from "./Dashboard";


export default function AssignNutritionistPage() {
  const { clientId } = useParams<{ clientId: string }>();
  const [client, setClient] = useState<UserData | null>(null);
  const [nutritionists, setNutritionists] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNutritionist, setSelectedNutritionist] = useState<UserData | null>(null);
  const [assigning, setAssigning] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAdminDashboard();
        console.log(res)
        
        // Find the specific client
        const foundClient = res.clients.find((c: UserData) => c.id === clientId);
        if (!foundClient) {
          toast.error("Client not found");
          navigate("/admin/clients");
          return;
        }
        
        setClient(foundClient);
        setNutritionists(res.nutritionists);
    
       
        
      } catch (error) {
        toast.error("Failed to load data");
        navigate("/admin/clients");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [clientId, navigate]);


  const handleAssignNutritionist = async() => {
    console.log(selectedNutritionist)
    if(!clientId) {return toast.error("input client id")}
    const nutritionistId = selectedNutritionist?.id
    if(!nutritionistId) { return toast.error("Nutritionist profile not found");
  }

    await assignNutritionist(clientId, nutritionistId)
    toast.success("nutritionist assigned successfully");
    toast.error("failed to assign nutritionist")

    navigate("/admin/clients")
  }



  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!client) {
    return null;
  }

  return (
    <div className="p-6 space-y-6">
      <ToastContainer />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate("/admin/clients")}
            className="text-gray-600 hover:text-gray-800 font-medium transition mb-2"
          >
            ← Back to Clients
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Assign Nutritionist</h1>
          <p className="text-gray-500 mt-1">
            Select a nutritionist for <span className="font-semibold text-gray-700">{client.name}</span>
          </p>
        </div>
      </div>

      {/* Client Info Card */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-md p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center">
            <span className="text-2xl font-bold">
              {client.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h2 className="text-2xl font-bold">{client.name}</h2>
            <p className="text-green-100">{client.email}</p>
            <p className="text-sm text-green-100 mt-1">
              Joined: {new Date(client.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            {client.nutritionistProfile && (
              <div className="mt-2 flex items-center space-x-2">
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
                  Currently Assigned
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="relative">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search nutritionists by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

  

      {/* Nutritionists List */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
      
        
        {nutritionists?.length === 0 ? (
          <div className="text-center py-16">
            <UserGroupIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
             No nutritionists available
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
            {nutritionists?.map((nutritionist) => (
              <div
                key={nutritionist.id}
                onClick={() => setSelectedNutritionist(nutritionist)}
                className="bg-blue-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-lg">
                        {nutritionist.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-lg">{nutritionist.name}</p>
                      <p className="text-sm text-gray-600">{nutritionist.email}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Joined: {new Date(nutritionist.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  {selectedNutritionist?.id === nutritionist.id && (
                    <CheckCircleIcon className="w-8 h-8 text-blue-600" />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Assign Button */}
      {selectedNutritionist && (
        <div className="flex justify-end space-x-4">

           <button
            onClick={handleAssignNutritionist}
            className="px-6 py-3 border border-gray-300 text-gray-700 font-medium bg-green-500 rounded-lg"
          >
            Assign
          </button>
          <button
            onClick={() => navigate("/admin/clients")}
            className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          
        </div>
      )}
    </div>
  );
}

