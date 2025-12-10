import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Plan = 'Basic' | 'Premium' | 'Meal+Fitness';

type Meal = {
  id: string;
  name: string;
  time: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  calories: number;
  shortDesc?: string;
};

type UserProfile = {
  firstName: string;
  avatarUrl?: string;
  profileCompletion: number; 
  goals: string[];
  plan: Plan;
  planExpiry: string; 
};

const mockUser: UserProfile = {
  firstName: 'Amina',
  avatarUrl: undefined,
  profileCompletion: 80,
  goals: ['Weight loss', 'Balanced diet'],
  plan: 'Premium',
  planExpiry: new Date(Date.now() + 1000 * 60 * 60 * 24 * 18).toISOString(), 
};

const todaysMeals: Meal[] = [
  { id: 'm1', name: 'Oats with Berries', time: 'Breakfast', calories: 350, shortDesc: 'High-fiber oats + mixed berries' },
  { id: 'm2', name: 'Grilled Chicken Salad', time: 'Lunch', calories: 480, shortDesc: 'Mixed greens, cherry tomatoes, olive oil' },
  { id: 'm3', name: 'Baked Salmon & Veg', time: 'Dinner', calories: 520, shortDesc: 'Omega-3 rich meal' },
];


function formatDaysRemaining(iso: string) {
  const expiry = new Date(iso);
  const diff = Math.ceil((expiry.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  if (diff < 0) return 'Expired';
  if (diff === 0) return 'Expires today';
  return `${diff} day${diff > 1 ? 's' : ''}`;
}



const ClientDashboard = () => {
  const navigate = useNavigate();
  const [user] = useState<UserProfile>(mockUser);
  const [meals] = useState<Meal[]>(todaysMeals);
  const [waterIntake, setWaterIntake] = useState<number>(6); // glasses

  const totalCalories = meals.reduce((s, m) => s + m.calories, 0);

  const handleViewMealPlan = () => {
  navigate("/client/meal-plan")
}


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <aside className="space-y-6 lg:col-span-1">
          <section className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-green-300 to-blue-300 flex items-center justify-center text-xl font-semibold text-white">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={`${user.firstName} avatar`} className="h-16 w-16 rounded-full object-cover" />
                ) : (
                  user.firstName.slice(0, 1)
                )}
              </div>
              <div>
                <p className="text-lg font-semibold">{user.firstName}</p>
                <p className="text-sm text-gray-500">{user.goals.join(' • ')}</p>
              </div>
            </div>

            <div className="mt-4">
              <label className="text-xs font-medium text-gray-600">Profile completion</label>
              <div className="mt-2 h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-3 rounded-full bg-gradient-to-r from-green-400 to-blue-500" style={{ width: `${user.profileCompletion}%` }} />
              </div>
              <div className="mt-2 text-xs text-gray-500">{user.profileCompletion}% complete</div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs text-gray-600">Current plan</p>
                <p className="font-medium">{user.plan}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-600">Expiry</p>
                <p className="font-medium">{new Date(user.planExpiry).toLocaleDateString()}</p>
                <p className="text-xs text-gray-500">{formatDaysRemaining(user.planExpiry)}</p>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button className="flex-1 rounded-md border border-transparent bg-blue-600 text-white py-2 text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">Renew / Upgrade</button>
              <button className="rounded-md border border-gray-200 bg-white py-2 px-3 text-sm font-medium hover:bg-gray-50">Payment history</button>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-4 shadow-sm border border-gray-200">
            <h4 className="text-sm font-semibold">Quick hydration</h4>
            <p className="text-xs text-gray-500 mt-1">Track daily water glasses</p>

            <div className="mt-3 flex items-center gap-3">
              <div className="flex items-center gap-2">
                <button
                  aria-label="decrease water"
                  onClick={() => setWaterIntake((v) => Math.max(0, v - 1))}
                  className="rounded-md border p-2 text-sm"
                >
                  -
                </button>
                <div className="text-lg font-semibold">{waterIntake}</div>
                <button
                  aria-label="increase water"
                  onClick={() => setWaterIntake((v) => Math.min(12, v + 1))}
                  className="rounded-md border p-2 text-sm"
                >
                  +
                </button>
              </div>

              <div className="ml-auto text-sm text-gray-600">Goal: 8 glasses</div>
            </div>

            <div className="mt-3 w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-2 rounded-full bg-green-400" style={{ width: `${Math.min(100, (waterIntake / 8) * 100)}%` }} />
            </div>
          </section>

        </aside>

        <main className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold leading-tight">Good morning, {user.firstName} 👋</h2>
                <p className="text-sm text-gray-500 mt-1">Here’s your plan for today. Keep it up — small habits compound!</p>
              </div>


                <button onClick={handleViewMealPlan} className="rounded-md bg-white border px-3 py-2 text-sm">View full meal plan</button>
             
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {['Breakfast', 'Lunch', 'Dinner'].map((slot) => {
                const meal = meals.find((m) => m.time === slot);
                return (
                  <article key={slot} className="rounded-lg border border-gray-100 p-4 bg-gray-50">
                    <div className="flex items-start gap-3">
                      <div className="h-12 w-12 rounded-md bg-white flex items-center justify-center font-medium text-gray-700">{slot.slice(0,1)}</div>
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold">{meal ? meal.name : `No ${slot.toLowerCase()} planned`}</h3>
                        <p className="text-xs text-gray-500 mt-1">{meal ? meal.shortDesc : 'Add a meal'}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{meal ? `${meal.calories} kcal` : '-'}</div>
                      </div>
                    </div>
                  
                  </article>
                );
              })}
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-semibold">Today’s summary</h4>
              <div className="mt-2 text-sm text-gray-600">Estimated calories: <span className="font-medium">{totalCalories} kcal</span></div>
            </div>
          </div>

          {/* Health Tips + Insights Row */}
          <section className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-4">
              <div className="rounded-lg border border-gray-100 p-4 bg-gray-50">
                <h4 className="text-sm font-semibold">Health Tips</h4>
                <p className="mt-2 text-sm text-gray-600">Short nutrition insight: Try swapping refined carbs for whole grains — they keep blood sugar steadier and help you feel full longer.</p>
              </div>

              <div className="rounded-lg border border-gray-100 p-4 bg-gray-50">
                <h4 className="text-sm font-semibold">Hydration Reminder</h4>
                <p className="mt-2 text-sm text-gray-600">You have drank <span className="font-medium">{waterIntake}</span> glasses today. Aim for 8 for optimal hydration.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg border border-gray-100 p-4 bg-white">
                <h4 className="text-sm font-semibold">Quick actions</h4>
                <div className="mt-3 flex flex-col gap-2">
                  <button className="w-full rounded-md border border-transparent bg-blue-600 py-2 text-sm font-medium text-white">Log meal</button>
                  <button className="w-full rounded-md border border-gray-200 py-2 text-sm font-medium">Start hydration challenge</button>
                </div>
              </div>

              <div className="rounded-lg border border-gray-100 p-4 bg-white">
                <h4 className="text-sm font-semibold">Nutrition card</h4>
                <p className="text-xs text-gray-500 mt-2">Short tip: prioritize vegetables to increase fiber intake without many calories.</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
export default ClientDashboard