import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Plus, Trash2, ChevronRight, ChevronLeft, Save, User, Target, ClipboardList } from 'lucide-react';
import { createMealPlan } from '../../services/nutritionistService';

// Constants defined outside component to avoid initialization issues
const MEAL_TYPES = ['breakfast', 'lunch', 'dinner'];
const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const getDefaultTime = (mealType: string): string => {
  const times: Record<string, string> = {
    'breakfast': '07:00',
    'lunch': '13:00',
    'dinner': '19:00',
  };
  return times[mealType] || '12:00';
};

const generateEmptyWeek = () => {
  return DAYS_OF_WEEK.map(day => ({
    dayOfWeek: day,
    meals: MEAL_TYPES.map(type => ({
      timeOfDay: getDefaultTime(type),
      typeOfMeal: type,
       food: type === 'Breakfast' ? 'Oatmeal with berries, 2 scrambled eggs, whole wheat toast' :
            type === 'Lunch' ? 'Grilled chicken breast, quinoa, steamed broccoli, mixed salad' :
            'Baked salmon, brown rice, roasted vegetables, side salad',
      nutritionalContent: type === 'Breakfast' ? '450 kcal, 25g protein, 50g carbs, 15g fat' :
                         type === 'Lunch' ? '600 kcal, 45g protein, 55g carbs, 18g fat' :
                         '550 kcal, 40g protein, 48g carbs, 20g fat',
    }))
  }));
};

const CreateMealPlan = () => {
      const { clientId, clientName } = useParams<{ clientId: string, clientName: string }>(); 
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);
  
  // Main meal plan data
  const [mealPlanData, setMealPlanData] = useState({
    dateRangeStart: '',
    dateRangeEnd: '',
    numberOfWeeks: 1,
    healthGoal: '',
    nutritionalRequirement: ''
  });

  // Weekly and daily meal plans
  const [weeklyPlans, setWeeklyPlans] = useState([
    {
      weekNumber: 1,
      dailyPlans: generateEmptyWeek()
    }
  ]);



  const showToast = (message: string, type: string = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const validateStep = (step: number) => {
    if (step === 1) {
      if (!mealPlanData.dateRangeStart || !mealPlanData.dateRangeEnd) {
        showToast('Please select both start and end dates', 'error');
        return false;
      }
      if (!mealPlanData.healthGoal || !mealPlanData.nutritionalRequirement) {
        showToast('Please fill in health goal and nutritional requirements', 'error');
        return false;
      }
      if (new Date(mealPlanData.dateRangeStart) >= new Date(mealPlanData.dateRangeEnd)) {
        showToast('End date must be after start date', 'error');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, weeklyPlans.length + 1));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const updateMealPlanData = (field: string, value: string) => {
    setMealPlanData(prev => {
      const updated = { ...prev, [field]: value };
      
      // Auto-calculate weeks when dates change
      if (field === 'dateRangeStart' || field === 'dateRangeEnd') {
        if (updated.dateRangeStart && updated.dateRangeEnd) {
          const start = new Date(updated.dateRangeStart);
          const end = new Date(updated.dateRangeEnd);
          const weeks = Math.ceil((end.getTime() - start.getTime()) / (7 * 24 * 60 * 60 * 1000));
          updated.numberOfWeeks = Math.max(1, weeks);
          
          // Adjust weekly plans array
          const currentWeeks = weeklyPlans.length;
          if (weeks > currentWeeks) {
            const newPlans = [...weeklyPlans];
            for (let i = currentWeeks; i < weeks; i++) {
              newPlans.push({
                weekNumber: i + 1,
                dailyPlans: generateEmptyWeek()
              });
            }
            setWeeklyPlans(newPlans);
          } else if (weeks < currentWeeks) {
            setWeeklyPlans(weeklyPlans.slice(0, weeks));
          }
        }
      }
      
      return updated;
    });
  };

  const updateMeal = (weekIdx: number, dayIdx: number, mealIdx: number, field: string, value: string) => {
    setWeeklyPlans(prev => {
      const updated = [...prev];
      const meal: any = updated[weekIdx].dailyPlans[dayIdx].meals[mealIdx];
      meal[field] = value;
      return updated;
    });
  };

  const handleSubmit = async () => {
    // Validate all meals have required data
    let hasEmptyMeals = false;
    weeklyPlans.forEach(week => {
      week.dailyPlans.forEach(day => {
        day.meals.forEach(meal => {
          if (!meal.food.trim()) hasEmptyMeals = true;
        });
      });
    });

    // if (hasEmptyMeals) {
    //   showToast('Please fill in all meal items or remove empty meals', 'error');
    //   return;
    // }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
       const payload = {
        clientId: clientId || '',
        dateRangeStart: new Date(mealPlanData.dateRangeStart).toISOString(),
        dateRangeEnd: new Date(mealPlanData.dateRangeEnd).toISOString(),
        numberOfWeeks: mealPlanData.numberOfWeeks,
        healthGoal: mealPlanData.healthGoal,
        nutritionalRequirement: mealPlanData.nutritionalRequirement,
        weeklyMealPlans: weeklyPlans
      };
      
      console.log('Submitting meal plan:', payload);
       await createMealPlan(payload);
      
      showToast('Meal plan created successfully!', 'success');
      
      // Reset form after success
      setTimeout(() => {
        setMealPlanData({
          dateRangeStart: '',
          dateRangeEnd: '',
          numberOfWeeks: 1,
          healthGoal: '',
          nutritionalRequirement: ''
        });
        setWeeklyPlans([{ weekNumber: 1, dailyPlans: generateEmptyWeek() }]);
        setCurrentStep(1);
      }, 1500);
      
    } catch (error) {
      showToast('Failed to create meal plan. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
        <User className="w-5 h-5 text-blue-600 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-blue-900">Creating plan for Client</p>
          <p className="text-xs text-blue-700 mt-1">Client: {clientName}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Start Date *
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="date"
              value={mealPlanData.dateRangeStart}
              onChange={(e) => updateMealPlanData('dateRangeStart', e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            End Date *
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="date"
              value={mealPlanData.dateRangeEnd}
              onChange={(e) => updateMealPlanData('dateRangeEnd', e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-sm text-gray-600">
          Duration: <span className="font-semibold text-gray-900">{mealPlanData.numberOfWeeks} week{mealPlanData.numberOfWeeks !== 1 ? 's' : ''}</span>
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Health Goal *
        </label>
        <div className="relative">
          <Target className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={mealPlanData.healthGoal}
            onChange={(e) => updateMealPlanData('healthGoal', e.target.value)}
            placeholder="e.g., Weight loss, Muscle gain, Diabetes management"
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nutritional Requirements *
        </label>
        <div className="relative">
          <ClipboardList className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <textarea
            value={mealPlanData.nutritionalRequirement}
            onChange={(e) => updateMealPlanData('nutritionalRequirement', e.target.value)}
            placeholder="e.g., 2000 kcal/day, High protein, Low carb, Gluten-free, etc."
            rows={4}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>
      </div>
    </div>
  );

  const renderWeekPlan = (weekIdx: number) => {
    const week = weeklyPlans[weekIdx];
    
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-4">
          <h3 className="text-lg font-semibold">Week {week.weekNumber} Meal Plan</h3>
          <p className="text-sm text-blue-100 mt-1">Plan meals for each day of the week</p>
        </div>

        {week.dailyPlans.map((day, dayIdx) => (
          <div key={dayIdx} className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h4 className="font-semibold text-gray-900">{day.dayOfWeek}</h4>
            </div>
            
            <div className="p-4 space-y-4">
              {day.meals.map((meal, mealIdx) => (
                <div key={mealIdx} className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-medium text-gray-900">{meal.typeOfMeal}</h5>
                    <input
                      type="time"
                      value={meal.timeOfDay}
                      onChange={(e) => updateMeal(weekIdx, dayIdx, mealIdx, 'timeOfDay', e.target.value)}
                      className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Food Items *
                      </label>
                      <input
                        type="text"
                        value={meal.food}
                        onChange={(e) => updateMeal(weekIdx, dayIdx, mealIdx, 'food', e.target.value)}
                        placeholder="e.g., Oatmeal with berries, 2 eggs, whole wheat toast"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Nutritional Content
                      </label>
                      <input
                        type="text"
                        value={meal.nutritionalContent}
                        onChange={(e) => updateMeal(weekIdx, dayIdx, mealIdx, 'nutritionalContent', e.target.value)}
                        placeholder="e.g., 450 kcal, 25g protein, 50g carbs, 15g fat"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const totalSteps = weeklyPlans.length + 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Meal Plan</h1>
          <p className="text-gray-600">Design a comprehensive nutrition plan for your client</p>
        </div>

        {/* Progress Indicator */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            {[...Array(totalSteps)].map((_, idx) => (
              <React.Fragment key={idx}>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                    currentStep > idx + 1 ? 'bg-green-500 text-white' :
                    currentStep === idx + 1 ? 'bg-blue-600 text-white' :
                    'bg-gray-200 text-gray-500'
                  }`}>
                    {idx + 1}
                  </div>
                  <span className="text-xs mt-2 font-medium text-gray-600">
                    {idx === 0 ? 'Details' : `Week ${idx}`}
                  </span>
                </div>
                {idx < totalSteps - 1 && (
                  <div className={`flex-1 h-1 mx-2 ${
                    currentStep > idx + 1 ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          {currentStep === 1 && renderStep1()}
          {currentStep > 1 && renderWeekPlan(currentStep - 2)}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-colors ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          {currentStep < totalSteps ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-colors ${
                isSubmitting
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Create Meal Plan
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5">
          <div className={`rounded-lg shadow-lg p-4 flex items-center gap-3 max-w-md ${
            toast.type === 'success' 
              ? 'bg-green-600 text-white' 
              : 'bg-red-600 text-white'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              toast.type === 'success' ? 'bg-white' : 'bg-white'
            }`} />
            <p className="font-medium">{toast.message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateMealPlan;