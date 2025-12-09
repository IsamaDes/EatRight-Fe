import React from "react";

const About = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-3xl font-bold text-green-700 mb-4">About EatRight</h2>

      <p className="text-gray-700 mb-4">
        EatRight is your personal nutrition and wellness companion. Our mission is to make healthy living
        simple, sustainable, and personalized. Whether you are looking to achieve fitness goals, manage
        your diet, or receive expert guidance from certified nutritionists, EatRight is designed to support
        you every step of the way.
      </p>

      <p className="text-gray-700 mb-4 font-semibold">With EatRight, you can:</p>

      <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
        <li>Track and manage your health and fitness goals</li>
        <li>Access personalized meal plans from professional nutritionists</li>
        <li>Monitor progress and get actionable insights</li>
        <li>Stay motivated with expert tips and reminders</li>
      </ul>

      <p className="text-gray-700">
        EatRight combines technology and nutrition science to help you make better choices, develop healthier
        habits, and live a balanced lifestyle — one meal at a time.
      </p>
    </div>
  );
};

export default About;
