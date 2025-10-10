import { useEffect, useState } from "react";
import foodcool from "../../assets/foodcool.jpg"

type Nutritionist = {
  name?: string;
};

type Meal = {
  day?: string;
  time?: string;
  meal?: string;
  meal_name?: string;
  ingredients?: string[];
  calories?: number;
};

type Week = {
  meal?: Meal[];
};

type FoodMenu = {
  date_range?: string;
  Nutritionist?: Nutritionist;
  weeks?: number;
  meal_plan?: Week[];
};

const MealPlanPage = () => {
  const [mealPlan, setMealPlan] = useState<FoodMenu | null>(null);
  const [loading, setLoading] = useState(true);
 

  // Mock fetch (replace with API later)
  useEffect(() => {
    const fetchMealPlan = async () => {
      try {
        const mockData: FoodMenu = {
          date_range: "Oct 7 - Oct 13, 2025",
          Nutritionist: { name: "Dr. Ada Healthy" },
          weeks: 1,
          meal_plan: [
            {
              meal: [
                {
                  day: "Monday",
                  time: "8:00 AM",
                  meal: "breakfast",
                  meal_name: "Oatmeal with fruits",
                  ingredients: ["Oats", "Banana", "Milk"],
                  calories: 320,
                },
                {
                  day: "Monday",
                  time: "1:00 PM",
                  meal: "lunch",
                  meal_name: "Grilled chicken salad",
                  ingredients: ["Chicken", "Lettuce", "Olive oil"],
                  calories: 450,
                },
                {
                  day: "Monday",
                  time: "7:00 PM",
                  meal: "dinner",
                  meal_name: "Rice and beans",
                  ingredients: ["Rice", "Fish", "Beans"],
                  calories: 480,
                },
              ],
            },
          ],
        };

        setMealPlan(mockData);
      } catch (err) {
        console.error("Error loading meal plan:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMealPlan();
  }, []);

  if (loading)
    return <p className="text-center py-10 text-gray-600">Loading meal plan...</p>;

  if (!mealPlan)
    return <p className="text-center text-gray-500">No meal plan available.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Header Section */}
      <div className="relative w-full h-60 rounded-2xl overflow-hidden shadow-md">
        <img
          src={foodcool}
          alt="Healthy food"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white p-8">
          <h1 className="text-3xl font-bold mb-2">EatGood</h1>
          <p className="text-sm md:text-base opacity-90">
            Nourish your body, live healthy.
          </p>
        </div>
      </div>

      

      {/* Plan Overview */}
      <div className="bg-green-50 border border-green-100 rounded-xl p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-green-700 mb-4">
          Your Weekly Meal Plan
        </h1>
        <p><span className="font-semibold">Date Range:</span> {mealPlan.date_range ?? "N/A"}</p>
        <p><span className="font-semibold">Nutritionist:</span> {mealPlan.Nutritionist?.name ?? "N/A"}</p>
        <p><span className="font-semibold">Weeks:</span> {mealPlan.weeks ?? "N/A"}</p>
      </div>

      {/* Meal Plan Details */}
      {mealPlan.meal_plan?.map((week, weekIdx) => (
        <div key={weekIdx}>
          <h2 className="text-xl font-semibold mb-4 text-green-800">
            Week {weekIdx + 1}
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {week.meal?.map((m, idx) => (
              <div
                key={idx}
                className="border rounded-lg p-5 shadow-sm bg-white hover:shadow-md transition-all duration-200"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold capitalize text-green-700">
                    {m.meal ?? "Meal"}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {m.day ?? "Unknown Day"}
                  </span>
                </div>
                <p className="text-lg font-medium mb-1">{m.meal_name ?? "Unnamed meal"}</p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Time:</span> {m.time ?? "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Calories:</span> {m.calories ?? 0} kcal
                </p>
                <div className="mt-2">
                  <span className="font-semibold">Ingredients:</span>
                  <ul className="list-disc list-inside text-gray-700 text-sm">
                    {m.ingredients?.length
                      ? m.ingredients.map((ing, i) => <li key={i}>{ing}</li>)
                      : <li>No ingredients listed</li>}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MealPlanPage;
