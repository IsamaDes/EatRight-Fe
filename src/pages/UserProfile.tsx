import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserById } from "../services/adminService";

export default function UserProfile() {
  const { id } = useParams();
  console.log("user id", id)
  const [user, setUser] = useState<any>(null);
  

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUserById(id);

      setUser(response.User);   
     };
    fetchUser();
  }, [id]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
      <p className="text-gray-600">{user.email}</p>
      <p className="text-gray-600">{user?.assignedNutritionist}</p>
      <p className="text-gray-500 text-sm mt-2">
        Joined: {new Date(user.createdAt).toLocaleDateString()}
      </p>

     
    </div>
  );
}
