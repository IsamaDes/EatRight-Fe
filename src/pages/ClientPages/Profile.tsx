// import { useState, useEffect } from "react";
// import { User } from "../../types/User"; 
// import { getClientProfile } from "../../services/clientService";


// const ClientProfile = () => {

//     const [user, setUser] = useState<User | null>(null);
//      const [userId, setUserId] = useState("");
//     const [loading, setLoading] = useState(true);


//     useEffect(() => {
//    const fetchUser = async () => {
//       try {
//         const data = await getClientProfile();
//         console.log("clients data:", data)
//         setUser(data);
//         setUserId(data.id)
//       } catch (err) {
//         console.error("Failed to fetch user", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUser();
//   }, []);

//   return (
//     <div
//       className=" mx-auto bg-white shadow-lg rounded-2xl p-9 border border-gray-100"
//     > 
//       {/* Header */}
//       <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
//         <h2 className="text-3xl font-bold text-gray-800">My Profile</h2>
//         <span className="text-sm text-gray-500">
//           Member since {new Date(user?.createdAt ?? "").toLocaleDateString()}
//         </span>
//       </div>

//   <div className="flex justify-between items-start">
//   {/* Profile Details */}
//   <div className="flex flex-col gap-5 bg-white p-6 rounded-2xl shadow-md text-gray-700 w-full max-w-md">
//     <div>
//       <p className="font-semibold text-gray-600">Full Name:</p>
//       <p className="text-lg">{user?.name}</p>
//     </div>

//     <div>
//       <p className="font-semibold text-gray-600">Email:</p>
//       <p className="text-lg">{user?.email}</p>
//     </div>

//     <div className="flex gap-3">
//       <p className="font-semibold text-gray-600">Role:</p>
//       <p className="text-md capitalize">{user?.role}</p>
//     </div>

//     <div className="flex gap-3">
//       <p className="font-semibold text-gray-600">Age:</p>
//       <p className="text-md">{user?.age ?? "Not provided"}</p>
//     </div>

//     {/* Health History */}
//     <div>
//       <p className="font-semibold text-gray-600 mb-1">Health History</p>
//       {user?.healthHistory?.length ? (
//         <ul className="list-disc list-inside space-y-1 text-gray-700">
//           {user.healthHistory.map((item, idx) => (
//             <li key={idx}>{item}</li>
//           ))}
//         </ul>
//       ) : (
//         <p className="text-gray-500">No recorded health history</p>
//       )}
//     </div>

//     {/* Wellness Goal */}
//     <div>
//       <p className="font-semibold text-gray-600">Wellness Goal</p>
//       <p className="text-lg italic">
//         {user?.wellness_goal || "Not specified"}
//       </p>
//     </div>
//   </div>

//   {/* Edit Button */}
//   <button
//     className="cursor-pointer px-5 py-2.5 bg-green-600 text-white font-medium rounded-full shadow-md 
//                hover:bg-green-700 hover:shadow-lg transition-all duration-200 ease-in-out 
//                focus:ring-2 focus:ring-green-400 focus:outline-none self-start"
//   >
//     Edit Profile
//   </button>
// </div>

//     </div>
//   );
// };

// export default ClientProfile;










import { useState, useEffect } from "react";

// Update your User type to match the actual data structure
interface ClientData {
  id: string;
  clientId: string;
  name: string;
  email: string;
  role: string;
  age: number | null;
  healthGoal: string | null;
  subscription: string | null;
  assignedNutritionistId: string | null;
}

interface ApiResponse {
  success: boolean;
  data: ClientData;
}

const ClientProfile = () => {
  const [clientData, setClientData] = useState<ClientData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientProfile = async () => {
      try {
        // Replace this with your actual API call
        // const response = await getClientProfile();
        
        // Mock data based on your console output
        const mockResponse: ApiResponse = {
          success: true,
          data: {
            id: "cmixtc69a000010rr34dhkxqn",
            clientId: "cmixtc69g000210rr23kquzds",
            name: "client",
            email: "client@email.com",
            role: "CLIENT",
            age: null,
            healthGoal: null,
            subscription: null,
            assignedNutritionistId: null,
          }
        };

        console.log("Client data:", mockResponse);
        
        if (mockResponse.success) {
          setClientData(mockResponse.data);
        }
      } catch (err) {
        console.error("Failed to fetch client profile", err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    
    fetchClientProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-gray-600">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  if (!clientData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-gray-600">No profile data available</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-9 border border-gray-100">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-800">My Profile</h2>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
          {clientData.role}
        </span>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
        {/* Profile Details */}
        <div className="flex flex-col gap-6 bg-gray-50 p-6 rounded-xl w-full lg:max-w-md">
          
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
              Basic Information
            </h3>
            
            <div>
              <p className="text-sm font-semibold text-gray-600">Full Name</p>
              <p className="text-lg text-gray-800">{clientData.name}</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-600">Email</p>
              <p className="text-lg text-gray-800">{clientData.email}</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-600">Age</p>
              <p className="text-lg text-gray-800">
                {clientData.age ?? (
                  <span className="text-gray-400 italic">Not provided</span>
                )}
              </p>
            </div>
          </div>

          {/* Health & Wellness */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
              Health & Wellness
            </h3>
            
            <div>
              <p className="text-sm font-semibold text-gray-600">Health Goal</p>
              <p className="text-lg text-gray-800">
                {clientData.healthGoal ?? (
                  <span className="text-gray-400 italic">Not set yet</span>
                )}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-600">Subscription Status</p>
              <p className="text-lg text-gray-800">
                {clientData.subscription ?? (
                  <span className="text-gray-400 italic">No active subscription</span>
                )}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-600">Assigned Nutritionist</p>
              <p className="text-lg text-gray-800">
                {clientData.assignedNutritionistId ?? (
                  <span className="text-gray-400 italic">Not assigned</span>
                )}
              </p>
            </div>
          </div>

          {/* Info Message */}
          {(!clientData.age || !clientData.healthGoal) && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <span className="font-semibold">Tip:</span> Complete your profile 
                to get personalized nutrition recommendations!
              </p>
            </div>
          )}
        </div>

        {/* Edit Button */}
        <button
          onClick={() => {
            // Add your edit profile handler here
            console.log("Edit profile clicked");
          }}
          className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg shadow-md 
                     hover:bg-green-700 hover:shadow-lg transition-all duration-200 ease-in-out 
                     focus:ring-2 focus:ring-green-400 focus:outline-none self-start
                     lg:self-auto"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ClientProfile;