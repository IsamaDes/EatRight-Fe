// pages/NutritionistsPage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminDashboard } from "../../services/adminService";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { 
  UserGroupIcon, 
  MagnifyingGlassIcon,
  FunnelIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

interface UserData {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  assignedNutritionist?: string | null;
}

export default function NutritionistsPage() {
  const [nutritionists, setNutritionists] = useState<UserData[]>([]);
  const [filteredNutritionists, setFilteredNutritionists] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNutritionists = async () => {
      try {
        const res = await getAdminDashboard();
        setNutritionists(res.nutritionist);
        setFilteredNutritionists(res.nutritionist);
        toast.success("Nutritionists loaded successfully!");
      } catch {
        toast.error("Failed to load nutritionists");
      } finally {
        setLoading(false);
      }
    };
    fetchNutritionists();
  }, []);

  // Filter nutritionists based on search query
  useEffect(() => {
    let filtered = nutritionists;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        nutritionist =>
          nutritionist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          nutritionist.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredNutritionists(filtered);
  }, [searchQuery, nutritionists]);

  const handleNutritionistClick = (nutritionistId: string) => {
    navigate(`/admin/nutritionist-profile/${nutritionistId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <ToastContainer />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-3 rounded-lg">
            <AcademicCapIcon className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Nutritionists</h1>
            <p className="text-gray-500">
              {filteredNutritionists.length} of {nutritionists.length} nutritionists
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

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Nutritionists List */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {filteredNutritionists.length === 0 ? (
          <div className="text-center py-16">
            <AcademicCapIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              {searchQuery
                ? "No nutritionists found matching your criteria"
                : "No nutritionists available"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Nutritionist
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
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredNutritionists.map((nutritionist) => (
                  <tr
                    key={nutritionist._id}
                    className="hover:bg-gray-50 transition cursor-pointer"
                    onClick={() => handleNutritionistClick(nutritionist._id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-sm">
                            {nutritionist.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{nutritionist.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-600">{nutritionist.email}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-500">
                        {new Date(nutritionist.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNutritionistClick(nutritionist._id);
                        }}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm transition"
                      >
                        View Profile →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Stats Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Nutritionists</p>
              <p className="text-3xl font-bold mt-2">{nutritionists.length}</p>
            </div>
            <UserGroupIcon className="w-12 h-12 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-md p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Active This Month</p>
              <p className="text-3xl font-bold mt-2">{nutritionists.length}</p>
            </div>
            <AcademicCapIcon className="w-12 h-12 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-md p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">New This Week</p>
              <p className="text-3xl font-bold mt-2">
                {nutritionists.filter(n => {
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return new Date(n.createdAt) > weekAgo;
                }).length}
              </p>
            </div>
            <UserGroupIcon className="w-12 h-12 text-purple-200" />
          </div>
        </div>
      </div>
    </div>
  );
}