import React, { useEffect, useState } from 'react';
import { getClientMealPlans } from '../../services/mealPlanService';
import { MealPlan } from '../../types/MealPlan';

type WeekDayRow = {
  day: string;
  date: string;
  breakfast: string;
  lunch: string;
  dinner: string;
};

const ClientMealPlans: React.FC = () => {
  const [weeklyTables, setWeeklyTables] = useState<WeekDayRow[][]>([]);
  const [selectedWeekIndex, setSelectedWeekIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
        const mealPlans: MealPlan[] = await getClientMealPlans();

        /**
         * Flatten weekly plans while keeping parent context
         */
        const allWeeklyPlans = mealPlans.flatMap((mealPlan) =>
          mealPlan.weeklyMealPlans.map((week) => ({
            ...week,
            parentMealPlan: mealPlan
          }))
        );

        const weekTables: WeekDayRow[][] = allWeeklyPlans.map((week) => {
          const weekStartDate = new Date(
            week.parentMealPlan.dateRangeStart
          );

          weekStartDate.setDate(
            weekStartDate.getDate() + (week.weekNumber - 1) * 7
          );

          return week.dailyPlans.map((day, index) => {
            const currentDate = new Date(weekStartDate);
            currentDate.setDate(weekStartDate.getDate() + index);

            let breakfast = '';
            let lunch = '';
            let dinner = '';

            day.meals.forEach((meal) => {
              if (meal.typeOfMeal === 'breakfast') breakfast = meal.food;
              if (meal.typeOfMeal === 'lunch') lunch = meal.food;
              if (meal.typeOfMeal === 'dinner') dinner = meal.food;
            });

            return {
              day: day.dayOfWeek,
              date: currentDate.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              }),
              breakfast,
              lunch,
              dinner
            };
          });
        });

        setWeeklyTables(weekTables);
        setSelectedWeekIndex(0);
      } catch (err: any) {
        setError(err.message || 'Error fetching meal plans');
      } finally {
        setLoading(false);
      }
    };

    fetchMealPlans();
  }, []);

  if (loading) return <p>Loading meal plans...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col bg-white gap-4 p-4 rounded-2xl">

      {/* WEEK SELECTOR */}
      {weeklyTables.length > 0 && (
        <div className="mb-4">
          <label className="mr-2 font-semibold">Select Week:</label>
          <select
            value={selectedWeekIndex}
            onChange={(e) => setSelectedWeekIndex(Number(e.target.value))}
            className="border px-3 py-1 rounded-md"
          >
            {weeklyTables.map((_, index) => (
              <option key={index} value={index}>
                Week {index + 1}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* TABLE HEADER */}
      <div className="grid grid-cols-4 text-center text-sm font-medium">
        <div className="bg-[#595e4d] text-white py-2 rounded-md">Day</div>
        <div className="bg-[#C3E66E] py-2 rounded-md">Breakfast</div>
        <div className="bg-[#FFCB65] py-2 rounded-md">Lunch</div>
        <div className="bg-[#DEF6D5] py-2 rounded-md">Dinner</div>
      </div>

      {/* WEEKLY TABLE */}
      <div className="space-y-2">
        {weeklyTables[selectedWeekIndex].map((day, idx) => (
          <div
            key={idx}
            className={`grid grid-cols-4 text-sm text-center items-center p-2 rounded-lg ${
              idx % 2 === 0 ? 'bg-[#F3FFED]' : 'bg-[#FFF7D3]'
            }`}
          >
            <div className="font-semibold flex flex-col">
              <span>{day.day}</span>
              <span className="text-xs text-gray-500">{day.date}</span>
            </div>
            <div>{day.breakfast || '—'}</div>
            <div>{day.lunch || '—'}</div>
            <div>{day.dinner || '—'}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientMealPlans;
