// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getClientProfile } from "../../services/clientService";
// import { ClientData, ClientSubscription } from './Profile';


// type Plan = 'Basic' | 'Premium' | 'Meal+Fitness';

// type Meal = {
//   id: string;
//   name: string;
//   time: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
//   calories: number;
//   shortDesc?: string;
// };



// const todaysMeals: Meal[] = [
//   { id: 'm1', name: 'Oats with Berries', time: 'Breakfast', calories: 350, shortDesc: 'High-fiber oats + mixed berries' },
//   { id: 'm2', name: 'Grilled Chicken Salad', time: 'Lunch', calories: 480, shortDesc: 'Mixed greens, cherry tomatoes, olive oil' },
//   { id: 'm3', name: 'Baked Salmon & Veg', time: 'Dinner', calories: 520, shortDesc: 'Omega-3 rich meal' },
// ];


// function formatDaysRemaining(iso: string) {
//   const expiry = new Date(iso);
//   const diff = Math.ceil((expiry.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
//   if (diff < 0) return 'Expired';
//   if (diff === 0) return 'Expires today';
//   return `${diff} day${diff > 1 ? 's' : ''}`;
// }



// const ClientDashboard = () => {
//   const navigate = useNavigate();
//   const [meals] = useState<Meal[]>(todaysMeals);
//   const [clientData, setClientData] = useState<ClientData | null>(null);
//   const [waterIntake, setWaterIntake] = useState<number>(6); 

//   const totalCalories = meals.reduce((s, m) => s + m.calories, 0);

//     useEffect(() => {
//       const fetchClientProfile = async () => {
//         const response = await getClientProfile();
//         console.log(response)
//         const client = response.data;
//         setClientData(client);  
//       };
//       fetchClientProfile();
//     }, []);


//   const handleViewMealPlan = () => {
//   navigate("/client/meal-plan")
// }


//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <aside className="space-y-6 lg:col-span-1">
//           <section className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
//             <div className="flex items-center gap-4">
//               <div className="h-16 w-16 rounded-full bg-gradient-to-br from-green-300 to-blue-300 flex items-center justify-center text-xl font-semibold text-white">
//                 {
//                   clientData?.name.slice(0, 1)
//                 }
//               </div>
//               <div>
//                 <p>{clientData?.name}</p>
              
//                 <p className="text-sm text-gray-500">HealthGoal: {clientData?.healthGoal}</p>
//               </div>
//             </div>

//             <div className="mt-4">
//               <label className="text-xs font-medium text-gray-600">Profile completion</label>
//               <div className="mt-2 h-3 bg-gray-100 rounded-full overflow-hidden">
//               </div>
//             </div>

//             <div className="mt-4 flex items-center justify-between gap-3">
//               <div>
//                 <p className="text-xs text-gray-600">Current plan</p>
//                 <p>{clientData?.subscription?.planName}</p>
//               </div>
//               <div className="text-right">
//                 <p className="text-xs text-gray-600">Expiry</p>

//               </div>
//             </div>
//           </section>

//           <section className="rounded-2xl bg-white p-4 shadow-sm border border-gray-200">
//             <h4 className="text-sm font-semibold">Quick hydration</h4>
//             <p className="text-xs text-gray-500 mt-1">Track daily water glasses</p>

//             <div className="mt-3 flex items-center gap-3">
//               <div className="flex items-center gap-2">
//                 <button
//                   aria-label="decrease water"
//                   onClick={() => setWaterIntake((v) => Math.max(0, v - 1))}
//                   className="rounded-md border p-2 text-sm"
//                 >
//                   -
//                 </button>
//                 <div className="text-lg font-semibold">{waterIntake}</div>
//                 <button
//                   aria-label="increase water"
//                   onClick={() => setWaterIntake((v) => Math.min(12, v + 1))}
//                   className="rounded-md border p-2 text-sm"
//                 >
//                   +
//                 </button>
//               </div>

//               <div className="ml-auto text-sm text-gray-600">Goal: 8 glasses</div>
//             </div>

//             <div className="mt-3 w-full h-2 bg-gray-100 rounded-full overflow-hidden">
//               <div className="h-2 rounded-full bg-green-400" style={{ width: `${Math.min(100, (waterIntake / 8) * 100)}%` }} />
//             </div>
//           </section>

//         </aside>

//         <main className="lg:col-span-2 space-y-6">
//           <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
//             <div className="flex items-start justify-between gap-4">
//               <div>
//                 <h2 className="text-2xl font-semibold leading-tight">Good morning, {clientData?.name} 👋</h2>
//                 <p className="text-sm text-gray-500 mt-1">Here’s your plan for today. Keep it up — small habits compound!</p>
//               </div>


//                 <button onClick={handleViewMealPlan} className="rounded-md bg-white border px-3 py-2 text-sm">View full meal plan</button>
             
//             </div>

//             <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
//               {['Breakfast', 'Lunch', 'Dinner'].map((slot) => {
//                 const meal = meals.find((m) => m.time === slot);
//                 return (
//                   <article key={slot} className="rounded-lg border border-gray-100 p-4 bg-gray-50">
//                     <div className="flex items-start gap-3">
//                       <div className="h-12 w-12 rounded-md bg-white flex items-center justify-center font-medium text-gray-700">{slot.slice(0,1)}</div>
//                       <div className="flex-1">
//                         <h3 className="text-sm font-semibold">{meal ? meal.name : `No ${slot.toLowerCase()} planned`}</h3>
//                         <p className="text-xs text-gray-500 mt-1">{meal ? meal.shortDesc : 'Add a meal'}</p>
//                       </div>
//                       <div className="text-right">
//                         <div className="text-sm font-medium">{meal ? `${meal.calories} kcal` : '-'}</div>
//                       </div>
//                     </div>
                  
//                   </article>
//                 );
//               })}
//             </div>

//             <div className="mt-6">
//               <h4 className="text-sm font-semibold">Today’s summary</h4>
//               <div className="mt-2 text-sm text-gray-600">Estimated calories: <span className="font-medium">{totalCalories} kcal</span></div>
//             </div>
//           </div>

//           {/* Health Tips + Insights Row */}
//           <section className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="md:col-span-2 space-y-4">
//               <div className="rounded-lg border border-gray-100 p-4 bg-gray-50">
//                 <h4 className="text-sm font-semibold">Health Tips</h4>
//                 <p className="mt-2 text-sm text-gray-600">Short nutrition insight: Try swapping refined carbs for whole grains — they keep blood sugar steadier and help you feel full longer.</p>
//               </div>

//               <div className="rounded-lg border border-gray-100 p-4 bg-gray-50">
//                 <h4 className="text-sm font-semibold">Hydration Reminder</h4>
//                 <p className="mt-2 text-sm text-gray-600">You have drank <span className="font-medium">{waterIntake}</span> glasses today. Aim for 8 for optimal hydration.</p>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <div className="rounded-lg border border-gray-100 p-4 bg-white">
//                 <h4 className="text-sm font-semibold">Quick actions</h4>
//                 <div className="mt-3 flex flex-col gap-2">
//                   <button className="w-full rounded-md border border-transparent bg-blue-600 py-2 text-sm font-medium text-white">Log meal</button>
//                   <button className="w-full rounded-md border border-gray-200 py-2 text-sm font-medium">Start hydration challenge</button>
//                 </div>
//               </div>

//               <div className="rounded-lg border border-gray-100 p-4 bg-white">
//                 <h4 className="text-sm font-semibold">Nutrition card</h4>
//                 <p className="text-xs text-gray-500 mt-2">Short tip: prioritize vegetables to increase fiber intake without many calories.</p>
//               </div>
//             </div>
//           </section>
//         </main>
//       </div>
//     </div>
//   );
// }
// export default ClientDashboard






















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

        setClientData(profileResponse.data);

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
                  {clientData?.subscription?.planName || 'Free plan'}
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
             {clientData?.subscription?.planName ?  (<button
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
