import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User } from "../../types/User"; 
import { getClientProfile } from "../../services/clientService";
import MealPlanManager from "../MealPlanManager";
import Header from "./Header";


const ClientProfile = () => {

    const [user, setUser] = useState<User | null>(null);
     const [userId, setUserId] = useState("");
    const [loading, setLoading] = useState(true);


    useEffect(() => {
   const fetchUser = async () => {
      try {
        const data = await getClientProfile();
        setUser(data);
        setUserId(data._id)
      } catch (err) {
        console.error("Failed to fetch user", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <div
      className=" mx-auto bg-white shadow-lg rounded-2xl p-9 border border-gray-100"
    > 
    <Header/>
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">My Profile</h2>
        <span className="text-sm text-gray-500">
          Member since {new Date(user?.createdAt ?? "").toLocaleDateString()}
        </span>
      </div>

  <div className="flex justify-between items-start">
  {/* Profile Details */}
  <div className="flex flex-col gap-5 bg-white p-6 rounded-2xl shadow-md text-gray-700 w-full max-w-md">
    <div>
      <p className="font-semibold text-gray-600">Full Name:</p>
      <p className="text-lg">{user?.name}</p>
    </div>

    <div>
      <p className="font-semibold text-gray-600">Email:</p>
      <p className="text-lg">{user?.email}</p>
    </div>

    <div className="flex gap-3">
      <p className="font-semibold text-gray-600">Role:</p>
      <p className="text-md capitalize">{user?.role}</p>
    </div>

    <div className="flex gap-3">
      <p className="font-semibold text-gray-600">Age:</p>
      <p className="text-md">{user?.age ?? "Not provided"}</p>
    </div>

    {/* Health History */}
    <div>
      <p className="font-semibold text-gray-600 mb-1">Health History</p>
      {user?.healthHistory?.length ? (
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
        {user?.wellness_goal || "Not specified"}
      </p>
    </div>
  </div>

  {/* Edit Button */}
  <button
    className="cursor-pointer px-5 py-2.5 bg-green-600 text-white font-medium rounded-full shadow-md 
               hover:bg-green-700 hover:shadow-lg transition-all duration-200 ease-in-out 
               focus:ring-2 focus:ring-green-400 focus:outline-none self-start"
  >
    Edit Profile
  </button>
</div>


     
      <MealPlanManager user={user} userId={userId}/>
    </div>
  );
};

export default ClientProfile;
