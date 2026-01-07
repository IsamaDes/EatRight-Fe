

export interface Meal {
  id: string;
  typeOfMeal: 'breakfast' | 'lunch' | 'dinner';
  food: string;
  timeOfDay: string;
  nutritionalContent: string;
}

export interface DailyPlan {
  id: string;
  dayOfWeek: string;
  meals: Meal[];
}

export interface WeeklyMealPlan {
  id: string;
  weekNumber: number;
  dailyPlans: DailyPlan[];
}

export interface MealPlan {
  id: string;
  healthGoal: string;
  dateRangeStart: string;
  dateRangeEnd: string;
  weeklyMealPlans: WeeklyMealPlan[];
}