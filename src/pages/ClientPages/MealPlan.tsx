import React, { useEffect, useState } from 'react';
import { getClientMealSchedule, MealDay } from '../../services/mealPlanService';

export default function MealPlan() { 
  const [currentMonth, setCurrentMonth] = useState('July 2025'); 
  const [schedule, setSchedule] = useState<MealDay[]>([]);
  const [breakfast, setBreakfast] = useState<string>('');
  const [lunch, setLunch] = useState<string>('')
  const [dinner, setDinner] = useState<string>('')
  const [weeklySchedules, setWeeklySchedules] = useState<MealDay[][]>([]);
  const [selectedWeekIndex, setSelectedWeekIndex] = useState(0);


  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await getClientMealSchedule();
        const groupedWeeks: MealDay[][] = [];
        for (let i = 0; i < response.length; i += 7 ){
          groupedWeeks.push(response.slice(i, i+7))
        }
        setWeeklySchedules(groupedWeeks)
        setSchedule(response);
        const today = new Date();
        const formattedToday = today.toISOString().split('T')[0].replace(/-/g, '/');
        const todayMeals = response.find(row => row.date === formattedToday);
        if (todayMeals) {
       todayMeals.meals.forEach(meal => {
           const names = meal.foods.map(food => food.food_name).join(', ');
           if(meal.meal_type === 'breakfast'){
            setBreakfast(names);
           } else if(meal.meal_type ==='lunch'){
            setLunch(names);
           } else if(meal.meal_type === 'dinner'){
            setDinner(names)
           }
       })

} else {
  console.log("No meals found for today.");
}
       
      } catch (error) {
        console.error('Error loading meal plan data:', error);
      }
    };


    fetchData();
  }, []);

  // const toggleDropdown = () => setIsOpen(!isOpen);

  const goToPreviousMonth = () => {
    if (currentMonth === 'March 2025') {
      setCurrentMonth('February 2025');
    } else if (currentMonth === 'February 2025') {
      setCurrentMonth('January 2025');
    } else {
      setCurrentMonth('March 2025');
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 'March 2025') {
      setCurrentMonth('April 2025');
    } else if (currentMonth === 'April 2025') {
      setCurrentMonth('May 2025');
    } else {
      setCurrentMonth('March 2025');
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 md:p-8 bg-[#f3fcf3] min-h-screen">
      {/* Today's Meal */}
      <div
        style={{ background: 'linear-gradient(249deg, #FF7E23 9.4%, #B72403 89.96%)' }}
        className="flex flex-col md:flex-row justify-between p-4 border rounded-2xl text-white"
      >
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          <div className="flex bg-green-100 w-[36px] h-[36px] items-center justify-center rounded-full">
            <img src="/subscriptionimg.svg" alt="" width={12} height={12} />
          </div>
          <div className="text-lg font-semibold">Today&#39;s Meal Plan</div>
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="bg-white p-3 rounded-2xl">
            <div className="text-[#2E0202]">Breakfast:</div>
            <div className="font-bold text-[#2E0202]">
                {breakfast || 'No meal'}             
             </div>
          </div>
          <div className="bg-[#FFE97B] p-3 rounded-2xl">
            <div className="text-[#2E0202]">Lunch:</div>
            <div className="font-bold text-[#2E0202]">
                {lunch || 'No meal'} 
            </div>
          </div>
          <div className="bg-[#DEF6D5] p-3 rounded-2xl">
            <div className="text-[#2E0202]">Dinner:</div>
            <div className="font-bold text-[#2E0202]">
                 {dinner || 'No meal'} 
            </div>
          </div>
        </div>
      </div>


      {/* Month Nav + Table Header */}
      <div className="flex flex-col bg-white gap-4 p-4 rounded-2xl">
        <div className="flex gap-4 items-center bg-gradient-to-r from-green-500 to-green-600 rounded-md px-4 py-2 text-white mb-4">
          <button onClick={goToPreviousMonth}>{'<'}</button>
          <button onClick={goToNextMonth}>{'>'}</button>
          <span className="font-semibold">{currentMonth}</span>
        </div>


        {weeklySchedules.length > 0 && (
          <div className='mb-4'>
            <label>Select Week:</label>
            <select value={selectedWeekIndex} onChange={(e) => setSelectedWeekIndex(Number(e.target.value))}>

              {weeklySchedules.map((_, index) => (
                <option key={index} value={index}>
                Week {index + 1}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="grid grid-cols-4 text-center text-sm font-medium">
          <div className="bg-[#595e4d] py-2 rounded-md">Day</div>
          <div className="bg-[#C3E66E] py-2 rounded-md">Breakfast</div>
          <div className="bg-[#FFCB65] py-2 rounded-md">Lunch</div>
          <div className="bg-[#DEF6D5] py-2 rounded-md">Dinner</div>
        </div>

    {/* weekly table */}
    <div className="space-y-2">
  {weeklySchedules.length === 0 ? (
    <p>No meal schedule found</p>
  ) : (
    weeklySchedules[selectedWeekIndex].map((day, idx) => {
      let breakfast = '';
      let lunch = '';
      let dinner = '';

      day.meals.forEach((meal) => {
        const names = meal.foods.map((food) => food.food_name).join(', ');
        if (meal.meal_type === 'breakfast') breakfast = names;
        else if (meal.meal_type === 'lunch') lunch = names;
        else if (meal.meal_type === 'dinner') dinner = names;
      });

      return (
        <div
          key={day.date}
          className={`grid grid-cols-4 text-sm text-center items-center p-2 rounded-lg ${
            idx % 2 === 0 ? 'bg-[#F3FFED]' : 'bg-[#FFF7D3]'
          }`}
        >
          <div className="font-semibold w-full md:w-[15%]">{day.date}-{day.day}</div>
            <div >{breakfast || '—'}</div>
            <div >{lunch || '—'}</div>
            <div >{dinner || '—'}</div>
          </div>
      
      );
    })
  )}
</div>


      </div>
    </div>
  );
}

