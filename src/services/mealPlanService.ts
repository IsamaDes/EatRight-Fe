import axiosInstance from '../utils/AxiosInstance';

// types/mealPlan.ts
export interface Meal {
  timeOfDay: string;
  typeOfMeal: string;
  food: string;
  nutritionalContent: string;
}

export interface DailyPlan {
  dayOfWeek: string;
  meals: Meal[];
}

export interface WeeklyMealPlan {
  weekNumber: number;
  dailyPlans: DailyPlan[];
}

export interface MealPlan {
  clientId: string;
  dateRangeStart: string;
  dateRangeEnd: string;
  numberOfWeeks: number;
  healthGoal: string;
  nutritionalRequirement: string;
  weeklyMealPlans: WeeklyMealPlan[];
}



export const getClientMealPlans = async () => {
  const res = await axiosInstance.get("/client/meal-plans");
   console.log(res)
   const data = res.data.data.clientProfile.mealPlans

  console.log(data)
  if (!data) throw new Error('No active meal plan found');
  return data;
};


// export const getClientMealPlans = async () => {
//   const res = await axiosInstance.get("/client/meal-plans");
//   const mealPlans = res.data.data.clientProfile?.mealPlans || [];
//   const allWeeklyPlans = mealPlans.flatMap((plan: any) => plan.weeklyMealPlans || []);
//   if (allWeeklyPlans.length === 0) throw new Error('No active meal plans found');
//   return allWeeklyPlans;
// };


