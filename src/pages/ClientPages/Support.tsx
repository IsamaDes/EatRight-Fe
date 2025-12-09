import React from "react";

const supportQuestions = [
  {
    question: "How do I update my profile?",
    answer: "Go to your profile page and click 'Edit Profile' to update your information.",
  },
  {
    question: "How do I subscribe to a meal plan?",
    answer: "Visit the subscription section in your dashboard and select your preferred plan.",
  },
  {
    question: "I forgot my password. What do I do?",
    answer: "Use the 'Forgot Password' link on the login page to reset your password.",
  },
  {
    question: "How do I contact customer support?",
    answer: "You can email us at support@eatright.com or chat with us via WhatsApp.",
  },
];

const ClientSupport = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-3xl font-bold mb-6 text-green-700">Help & Support</h2>

      <div className="space-y-4">
        {supportQuestions.map((item, index) => (
          <div
            key={index}
            className="p-4 border-l-4 border-green-500 bg-green-50 rounded-md shadow-sm"
          >
            <p className="font-semibold">{item.question}</p>
            <p className="mt-1 text-gray-700">{item.answer}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-green-100 rounded-md shadow-sm">
        <p className="font-semibold mb-2">Contact Support:</p>
        <ul className="space-y-1">
          <li>
            Email:{" "}
            <a
              href="mailto:support@eatright.com"
              className="text-green-700 underline"
            >
              support@eatright.com
            </a>
          </li>
          <li>
            WhatsApp:{" "}
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-700 underline"
            >
              Chat with us
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ClientSupport;
