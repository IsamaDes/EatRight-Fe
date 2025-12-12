// src/services/nutritionistService.ts
import axiosInstance from "../utils/AxiosInstance";


// Define the meal interface
interface Meal {
  timeOfDay: string;
  typeOfMeal: string;
  food: string;
  nutritionalContent: string;
}

// Define the daily meal plan interface
interface DailyMealPlan {
  dayOfWeek: string;
  meals: Meal[];
}

// Define the weekly meal plan interface
interface WeeklyMealPlan {
  weekNumber: number;
  dailyPlans: DailyMealPlan[];
}

// Main meal plan data interface
export interface MealPlanData {
  clientId: string;
  dateRangeStart: string; // ISO string format
  dateRangeEnd: string; // ISO string format
  numberOfWeeks: number;
  healthGoal: string;
  nutritionalRequirement: string;
  weeklyMealPlans: WeeklyMealPlan[];
}


export const getNutritionistDashboard = async () => {
  const res = await axiosInstance.get("/nutritionist/dashboard");
  return res.data.data;
};

export const getNutritionistProfile = async () => {
  try {
    const response = await axiosInstance.get("/nutritionist/profile");
    return response.data.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const getClientsForNutritionist = async () => {
  try {
    const response = await axiosInstance.get("/nutritionist/clients");
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const createMealPlan = async (mealPlanData: MealPlanData) => {
  const { data } = await axiosInstance.post("/nutritionist/create-mealplan", mealPlanData);
  return data;
};

export const getAllMealPlans = async () => {
  const { data } = await axiosInstance.get("/nutritionist");
  return data;
};

export const getMealPlanById = async (id: string) => {
  const { data } = await axiosInstance.get(`/nutritionist/${id}`);
  return data;
};

export const updateMealPlan = async (id: string, updateData: Partial<MealPlanData>) => {
  const { data } = await axiosInstance.put(`/nutritionist/${id}`, updateData);
  return data;
};



