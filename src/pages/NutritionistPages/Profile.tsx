import React, { useEffect, useState } from 'react'
import Header from './Header'
import MealPlanManager from '../MealPlanManager'
import { User } from '../../types/User'
import { getNutritionistProfile } from '../../services/nutritionistService'

const NutritionistProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  console.log("Logged-in user:", user);

  useEffect(() => {
    const fetchUser = async() => {
    try{
    setLoading(true);
    const response = await getNutritionistProfile();
    setUser(response)
    }catch(err){
     console.error("Failed to fetch user", err);
    }finally{setLoading(false)
    }
  }
    fetchUser()
  }, [])


  return (
    <div>

      <Header/>
      <div className='flex flex-col'>
         <span>Welcome {user?.name}</span>
      <span> {user?.role}</span>
      </div>
     
      <MealPlanManager user={user}/>
    </div>
  )
}

export default NutritionistProfile