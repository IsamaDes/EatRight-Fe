🥗 EatRight Frontend

[👉 Visit the Live App](https://eat-right-fe.vercel.app/)

🧠 Overview

EatRight is a health and wellness platform designed to connect clients, nutritionists, and admins in a seamless experience that promotes healthy living.
It provides meal planning, personalized nutrition tracking, and administrative management tools — all in one intuitive interface.

This repository contains the frontend built with React + TypeScript, designed with a focus on performance, accessibility, and a clean, modern user experience.

🚀 Tech Stack
Category Technology
Framework React 18

- TypeScript

Routing React Router v6

Styling Tailwind CSS

Animations Framer Motion

Icons Lucide React

API Communication Axios

State Management React Hooks (useState, useEffect, Context where needed)
Deployment Vercel
⚙️ Features
👤 Clients

Register and log in securely.

View personalized meal plans and nutrition details.

Track health history and wellness goals.

Access weekly meal breakdowns with calorie info and ingredients.

🥦 Nutritionists

Create and manage client meal plans.

Monitor progress and update recommendations.

Access analytics on client wellness and engagement.

🛠️ Admin

Manage users (clients & nutritionists).

Oversee system-wide data and user permissions.

Ensure compliance and operational integrity.

🧩 Folder Structure
eat-right-fe/
├── src/
│ ├── components/ # Reusable UI components
│ ├── pages/ # Page-level React components (Home, Login, Profile, etc.)
│ ├── services/ # API calls and helper utilities
│ ├── assets/ # Images, icons, and static resources
│ ├── context/ # (If used) Global state management
│ ├── App.tsx # App entry point and router setup
│ ├── main.tsx # ReactDOM bootstrap
│ └── index.css # Tailwind base styles
├── public/
│ └── index.html
└── package.json

🔐 Authentication & Authorization

The app uses JWT (JSON Web Tokens) for secure authentication between the frontend and backend.
Tokens are stored safely in local storage for session management.
User roles (client, nutritionist, admin) determine route access and visibility across the app.

🔧 Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/IsamaDes/Eat-Right-Fe.git
cd Eat-Right-Fe

2️⃣ Install dependencies
npm install

4️⃣ Start the development server
npm run dev

5️⃣ Build for production
npm run build

🌐 Backend Repository

The backend API powering this app is built with Node.js, Express, and MongoDB.
Find it here:
👉 EatRight Backend Repo

🧪 Future Improvements

✅ Dark mode support

📊 Nutrition analytics dashboard

💬 Real-time chat between clients and nutritionists

📱 Progressive Web App (PWA) support

🌍 Multi-language localization

💻 Author

👨‍💻 Isama Desmond
Full-stack Developer | React • Node.js • TypeScript
🌐 [GitHub](https://github.com/IsamaDes)  
✉️ [LinkedIn](https://www.linkedin.com/in/disama/)

📝 License

This project is licensed under the MIT License — feel free to fork and contribute!
