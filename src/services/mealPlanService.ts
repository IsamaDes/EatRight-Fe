import axiosInstance from '../utils/AxiosInstance';

export interface FoodItem {
  food_name: string;
  quantity: string;
  calories: number | null;
  protein: number;
  carbs: number;
  fat: number;
  notes: string;
  source_plan: {
    id: string;
    title: string;
    nutritionist: {
      id: string;
      first_name: string;
      last_name: string;
    };
  };
}

export interface Meal {
  meal_type: 'breakfast' | 'lunch' | 'dinner';
  time: string;
  foods: FoodItem[];
}

export interface MealDay {
  date: string;
  day: string;
  meals: Meal[];
}

// mealPlanService.ts
export const getClientMealPlans = async (clientId: string) => {
  const res = await axiosInstance.get(`/meal-plans/client/${clientId}`, {
    params: { status: 'active' }
  });

  const data = res.data?.data?.[0];
  if (!data) throw new Error('No active meal plan found');
  return data;
};

export const getClientMealSchedule = async (
  clientId: string,
  start?: string,
  end?: string
): Promise<MealDay[]> => {
  const params = new URLSearchParams();
  if (start) params.append('start_date', start);
  if (end) params.append('end_date', end);

  const res = await axiosInstance.get(`/meal-plans/client/${clientId}/meal-schedule?${params.toString()}`);
  return res.data?.data?.rows || [];
};
