import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import MealPlanManager from '../MealPlanManager'
import { User } from '../../types/User'
import { getNutritionistProfile, getClientsForNutritionist } from '../../services/nutritionistService'


interface UserData {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  assignedNutritionist?: string;
}


const NutritionistProfile = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
    const [userList, setUserList] = useState<UserData[]>([]);
  

  console.log("Logged-in user:", user?._id);

  
    const fetchUser = async() => {
    try{
    const response = await getNutritionistProfile();
    setUser(response)
    setUserId(response._id)
    }catch(err){
     console.error("Failed to fetch user", err);
    }
    }
  
  const fetchClientsForNutritionist = async() => {
    try{
      const userList = await getClientsForNutritionist()
    }catch(err){
     console.error("Failed to fetch user", err);

    }
  }
  useEffect(() => {
  
    fetchUser()
    fetchClientsForNutritionist()
  }, [])


  return (
    <div>

      <Header/>
      <div className='flex flex-col'>
         <span>Welcome {user?.name}</span>
      <span> {user?.role}</span>
      </div>

       {userList?.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No records found.</p>
          ) : (
            <ul className="divide-y divide-gray-200 max-h-80 overflow-y-auto">
              {userList?.map((user) => (
                <li key={user._id} 
                onClick={() => navigate(`/users/${user?._id}`)}
                className="py-3 flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                  
                </li>
              ))}
            </ul>
          )}
     
      <MealPlanManager user={user} userId={userId}/>
    </div>
  )
}

export default NutritionistProfile