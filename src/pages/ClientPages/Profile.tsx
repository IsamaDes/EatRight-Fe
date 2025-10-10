// type User = {
//   _id: string;
//   name: string;
//   email: string;
//   role: "client" | "nutritionist" | "admin";
//   age?: number | null;
//   healthHistory: string[];
//   wellness_goal?: string | null;
//   createdAt?: string;
//   updatedAt?: string;
// };

// const ClientProfile = ({ user }: {user: User}) => {
//   return (
//     <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6">
//       <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
//       <div className="space-y-3">
//         <p><strong>Full Name:</strong> {user.name}</p>
//         <p><strong>Email:</strong> {user.email}</p>
//         <p><strong>Role:</strong> {user.role}</p>
//         <p><strong>Age:</strong> {user.age || "Not provided"}</p>
//         <p><strong>Health History:</strong> 
//           {user?.healthHistory?.length > 0 ? (
//             <ul className="list-disc ml-6">
//               {user.healthHistory.map((item: string, idx: number) => (
//                 <li key={idx}>{item}</li>
//               ))}
//             </ul>
//           ) : (
//             "No recorded health history"
//           )}
//         </p>
//         <p><strong>Wellness Goal:</strong> {user.wellness_goal || "Not specified"}</p>
//         <p><strong>Member Since:</strong> {new Date(user.createdAt ?? "").toLocaleDateString()}</p>
//       </div>
//     </div>
//   );
// };

// export default ClientProfile;



// import { motion } from "framer-motion";
// import { User } from "../../types/User"; // optional: define separately if you have a types folder
// import { UserCircle2, Mail, Target, Activity, Calendar, Heart } from "lucide-react";

// const ClientProfile = ({ user }: { user: User }) => {
//   return (
//     <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-10 border border-gray-100">
//       {/* Header Section */}
//       <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
//         {/* Avatar */}
//         <div className="relative">
//           <UserCircle2 className="w-24 h-24 text-green-600" />
//           <span className="absolute bottom-0 right-0 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
//             {user.role}
//           </span>
//         </div>

//         {/* Basic Info */}
//         <div>
//           <h2 className="text-3xl font-semibold text-gray-800">{user.name}</h2>
//           <p className="text-gray-500 flex items-center gap-2 mt-1">
//             <Mail className="w-4 h-4 text-gray-400" /> {user.email}
//           </p>
//           <p className="text-sm text-gray-400 mt-1">
//             Member since:{" "}
//             {user.createdAt
//               ? new Date(user.createdAt).toLocaleDateString()
//               : "N/A"}
//           </p>
//         </div>
//       </div>

//       {/* Divider */}
//       <hr className="my-6 border-gray-200" />

//       {/* Profile Details */}
//       <div className="space-y-6">
//         {/* Age */}
//         <motion.div
//           whileHover={{ scale: 1.01 }}
//           className="flex items-center justify-between bg-green-50 p-4 rounded-xl"
//         >
//           <div className="flex items-center gap-3">
//             <Activity className="text-green-600 w-5 h-5" />
//             <span className="font-medium text-gray-700">Age</span>
//           </div>
//           <span className="text-gray-800 font-semibold">
//             {user.age || "Not provided"}
//           </span>
//         </motion.div>

//         {/* Wellness Goal */}
//         <motion.div
//           whileHover={{ scale: 1.01 }}
//           className="flex items-center justify-between bg-green-50 p-4 rounded-xl"
//         >
//           <div className="flex items-center gap-3">
//             <Target className="text-green-600 w-5 h-5" />
//             <span className="font-medium text-gray-700">Wellness Goal</span>
//           </div>
//           <span className="text-gray-800 font-semibold">
//             {user.wellness_goal || "Not specified"}
//           </span>
//         </motion.div>

//         {/* Health History */}
//         <motion.div
//           whileHover={{ scale: 1.01 }}
//           className="bg-green-50 p-4 rounded-xl"
//         >
//           <div className="flex items-center gap-3 mb-2">
//             <Heart className="text-green-600 w-5 h-5" />
//             <span className="font-medium text-gray-700">Health History</span>
//           </div>
//           {user.healthHistory && user.healthHistory.length > 0 ? (
//             <ul className="list-disc list-inside text-gray-800 space-y-1 ml-1">
//               {user.healthHistory.map((item: string, idx: number) => (
//                 <li key={idx} className="text-sm">{item}</li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-sm text-gray-500">No recorded health history</p>
//           )}
//         </motion.div>
//       </div>

//       {/* Footer */}
//       <div className="text-center mt-8">
//         <p className="text-sm text-gray-400">
//           Last updated:{" "}
//           {user.updatedAt
//             ? new Date(user.updatedAt).toLocaleDateString()
//             : "N/A"}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ClientProfile;








import { motion } from "framer-motion";
import { User } from "../../types/User"; // assuming you created this type
import { useState, useEffect} from "react";

interface ClientProfileProps {
  user: User;
}

const ClientProfile: React.FC<ClientProfileProps> = ({ user }) => {
  const [role, setRole] = useState("")

   const [userName, setUserName] = useState("");
  
    useEffect(() => {
    const storedName = localStorage.getItem("user_name");
    if (storedName) {
      setUserName(storedName)
  } else {
      setUserName("")
  }
    
    }, [])
  

  useEffect(() => {
  const storedRole = localStorage.getItem("role");
  if (storedRole) {
    setRole(storedRole);
  }
}, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-10 border border-gray-100"
    >
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">My Profile</h2>
        <span className="text-sm text-gray-500">
          Member since {new Date(user.createdAt ?? "").toLocaleDateString()}
        </span>
      </div>

      {/* Profile Details */}
      <div className="space-y-5 text-gray-700">
        <div>
          <p className="font-semibold text-gray-600">Full Name:</p>
          <p className="text-lg">{userName }</p>
        </div>

        <div>
          <p className="font-semibold text-gray-600">Email:</p>
          <p className="text-lg">{user.email}</p>
        </div>

       
          <div className="flex gap-3 ">
            <p className="font-semibold text-gray-600">Role:</p>
            <p className="text-md capitalize">{role}</p>
          </div>

          <div className="flex gap-3">
            <p className="font-semibold text-gray-600">Age:</p>
            <p className="text-md">{user.age ?? "Not provided"}</p>
          </div>
     

        {/* Health History */}
        <div>
          <p className="font-semibold text-gray-600 mb-1">Health History</p>
          {user.healthHistory?.length ? (
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {user.healthHistory.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No recorded health history</p>
          )}
        </div>

        {/* Wellness Goal */}
        <div>
          <p className="font-semibold text-gray-600">Wellness Goal</p>
          <p className="text-lg italic">
            {user.wellness_goal || "Not specified"}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-8 border-t pt-4 text-right">
        <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm transition">
          Edit Profile
        </button>
      </div>
    </motion.div>
  );
};

export default ClientProfile;
