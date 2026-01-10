import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getClientProfile } from '../../services/clientService';
import { getClientMealPlans } from '../../services/mealPlanService';
import { ClientData } from './Profile';

/* ---------------------------------- Types --------------------------------- */

type MealSlot = 'Breakfast' | 'Lunch' | 'Dinner';

type DashboardMeal = {
  id: string;
  name: string;
  time: MealSlot;
  calories: number;
  shortDesc?: string;
};

/* -------------------------------- Utilities ------------------------------- */

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

/* ------------------------------ Component ---------------------------------- */

const ClientDashboard: React.FC = () => {
  const navigate = useNavigate();

  const [clientData, setClientData] = useState<ClientData | null>(null);
  const [todayMeals, setTodayMeals] = useState<DashboardMeal[]>([]);
  const [waterIntake, setWaterIntake] = useState<number>(6);
  const [loadingMeals, setLoadingMeals] = useState<boolean>(true);


  /* --------------------------- Derived values --------------------------- */

  const totalCalories = useMemo(
    () => todayMeals.reduce((sum, meal) => sum + meal.calories, 0),
    [todayMeals]
  );

  /* ------------------------------ Data fetch ------------------------------ */

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [profileResponse, mealPlans] = await Promise.all([
          getClientProfile(),
          getClientMealPlans()
        ]);

        console.log("clientData", profileResponse.data)

        const profile = profileResponse.data;

        const activeSubscription =
        profile.subscription?.find((sub: any) => sub.status === "active") || null;

        setClientData( {
          ...profile, 
          activeSubscription,});

        const todayKey = new Date().toDateString();
        const mealsForToday: DashboardMeal[] = [];

        mealPlans.forEach((plan: any) => {
          plan.weeklyMealPlans.forEach((week: any) => {
            const weekStart = new Date(plan.dateRangeStart);
            weekStart.setDate(
              weekStart.getDate() + (week.weekNumber - 1) * 7
            );

            week.dailyPlans.forEach((day: any, index: any) => {
              const dayDate = new Date(weekStart);
              dayDate.setDate(weekStart.getDate() + index);

              if (dayDate.toDateString() === todayKey) {
                day.meals.forEach((meal: any) => {
                  mealsForToday.push({
                    id: meal.id,
                    name: meal.food,
                    calories: meal.calories ?? 0,
                    shortDesc: meal.description,
                    time:
                      meal.typeOfMeal === 'breakfast'
                        ? 'Breakfast'
                        : meal.typeOfMeal === 'lunch'
                        ? 'Lunch'
                        : 'Dinner'
                  });
                });
              }
            });
          });
        });

        setTodayMeals(mealsForToday);
      } catch (error) {
        console.error('Dashboard load failed:', error);
      } finally {
        setLoadingMeals(false);
      }
    };

    fetchDashboardData();
  }, []);

  /* ------------------------------ Handlers ------------------------------ */

  const handleViewMealPlan = () => navigate('/client/meal-plan');

  /* -------------------------------- Render -------------------------------- */

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ============================== SIDEBAR ============================== */}

        <aside className="lg:col-span-1 space-y-6">
          <section className="rounded-2xl bg-white p-6 border shadow-sm">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-green-400 to-blue-400 flex items-center justify-center text-xl font-semibold text-white">
                {clientData?.name?.[0]}
              </div>

              <div>
                <p className="font-medium">{clientData?.name}</p>
                <p className="text-xs text-gray-500">
                  Health goal: {clientData?.healthGoal || '—'}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-between text-sm">
              <div>
                <p className="text-gray-500 text-xs">Current plan</p>
                <p className="font-medium">
                  {clientData?.activeSubscription?.planName || 'Free plan'}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-4 border shadow-sm">
            <h4 className="text-sm font-semibold">Hydration</h4>
            <p className="text-xs text-gray-500 mt-1">
              Track today’s water intake
            </p>

            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={() => setWaterIntake((v) => Math.max(0, v - 1))}
                className="border rounded-md px-3 py-1"
              >
                −
              </button>

              <span className="font-semibold text-lg">{waterIntake}</span>

              <button
                onClick={() => setWaterIntake((v) => Math.min(12, v + 1))}
                className="border rounded-md px-3 py-1"
              >
                +
              </button>

              <span className="ml-auto text-xs text-gray-500">
                Goal: 8 glasses
              </span>
            </div>

            <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-2 bg-green-400"
                style={{ width: `${Math.min(100, (waterIntake / 8) * 100)}%` }}
              />
            </div>
          </section>
        </aside>

        {/* ============================== MAIN ============================== */}

        <main className="lg:col-span-2 space-y-6">
          <section className="rounded-2xl bg-white p-6 border shadow-sm">
            <div className="flex justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">
                  {getGreeting()}, {clientData?.name}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Here’s your nutrition plan for today.
                </p>
              </div>
             {clientData?.activeSubscription?.planName ?  (<button
                onClick={handleViewMealPlan}
                className="border rounded-md px-3 py-2 text-sm"
              >
                View full meal plan
              </button> ) : <span className="text-sm text-gray-500 max-w-xs text-right">
      Subscribe to get assigned to a nutritionist and view your personalized
      meal plan
    </span>}
             
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {(['Breakfast', 'Lunch', 'Dinner'] as MealSlot[]).map((slot) => {
                const meal = todayMeals.find((m) => m.time === slot);

                return (
                  <article
                    key={slot}
                    className="rounded-lg border bg-gray-50 p-4"
                  >
                    <div className="flex gap-3">
                      <div className="h-12 w-12 rounded-md bg-white border flex items-center justify-center font-semibold">
                        {slot[0]}
                      </div>

                      <div className="flex-1">
                        <h3 className="text-sm font-semibold">
                          {meal ? meal.name : `No ${slot.toLowerCase()} planned`}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {meal
                            ? meal.shortDesc
                            : 'Check full meal plan for details'}
                        </p>
                      </div>

                      <div className="text-sm font-medium">
                        {meal ? `${meal.calories} kcal` : '—'}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-6 text-sm text-gray-600">
              Estimated calories today:{' '}
              <span className="font-medium">{totalCalories} kcal</span>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ClientDashboard;
