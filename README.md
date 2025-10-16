🥗 EatRight Frontend

[👉 Visit the Live App](https://eat-right-fe.vercel.app/)

🥗 EatRight Frontend

The EatRight Frontend is a secure and responsive client application that connects to the EatRight Backend API.
It allows users to register, log in, and interact with meal plans, nutrition dashboards, and admin controls — all within a role-based, authenticated environment.

Built with React (TypeScript) and TailwindCSS, the app emphasizes security, clarity, and user experience.

Key Features
🔐 Authentication

Secure registration and login flows integrated with the EatRight backend.

JWT-based authentication with short-lived access tokens.

Uses HttpOnly cookies (set and managed by the backend) for secure session handling — no tokens stored in localStorage or sessionStorage.

Automatic session refresh handled via backend-issued refresh tokens.

🧠 Role-Based UI (RBAC)

User roles determine what the frontend displays:

Admin: Can view and delete any user’s tasks or meal plans.

Nutritionist: Can create and manage meal plans for clients.

Client: Can view personal meal plans and progress but cannot modify them.

All role checks are enforced both client-side and server-side for maximum security.

🗂 Task & Meal Plan Management

Display a paginated list of tasks or meal plans.

Create new tasks (available to all logged-in users).

Delete button is only visible (and functional) for Admin users.

Nutritionists can create and assign meal plans to clients.

🧩 Secure Token Handling Strategy
❌ What we don’t do

We do not store JWTs in:

localStorage

sessionStorage

or any accessible JavaScript variable that persists across reloads.

This avoids XSS (Cross-Site Scripting) vulnerabilities where malicious scripts could steal tokens.

✅ What we do instead

Tokens are securely managed using HttpOnly Cookies — set by the backend on successful login.

How this works:

On login, the backend sends:

Set-Cookie: accessToken=...; HttpOnly; Secure; SameSite=Strict

Cookies are automatically attached to requests by the browser.

The frontend never manually reads or writes the token.

When the access token expires, the app triggers a /refresh-token request handled by the backend.

This ensures tokens are never exposed to JavaScript, reducing attack surfaces dramatically.

| Category          | Technology                                            |
| ----------------- | ----------------------------------------------------- |
| Framework         | **React 18+ (TypeScript)**                            |
| Styling           | **TailwindCSS**                                       |
| State Management  | React Hooks / Context API                             |
| API Communication | Axios with interceptors                               |
| Routing           | React Router v6                                       |
| Security          | HttpOnly Cookies, Role-based Access, Input Validation |

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

EatRight-Frontend/
│
├── src/
│ ├── components/
│ │ ├── Header.tsx
│ │ ├── MealPlanManager.tsx
│ │ ├── Dashboard/
│ │ │ ├── AdminProfile.tsx
│ │ │ ├── ClientProfile.tsx
│ │ │ └── NutritionistProfile.tsx
│ │
│ ├── pages/
│ │ ├── Login.tsx
│ │ ├── Register.tsx
│ │ └── Home.tsx
│ │
│ ├── services/
│ │ ├── apiClient.ts # Axios setup with secure cookie handling
│ │ ├── authService.ts
│ │ ├── adminService.ts
│ │ ├── nutritionistService.ts
│ │ └── clientService.ts
│ │
│ ├── types/
│ │ ├── User.ts
│ │ └── MealPlanData.ts
│ │
│ ├── hooks/
│ │ └── useAuth.ts
│ │
│ ├── App.tsx
│ └── main.tsx
│
├── .env
├── package.json
├── tailwind.config.js
└── README.md

⚙️ Setup & Installation
1️⃣ Clone Repository
git clone https://github.com/<your-username>/EatRight-Frontend.git
cd EatRight-Frontend

2️⃣ Install Dependencies
npm install

3️⃣ Configure Environment Variables

Create a .env file in the project root:

VITE_API_BASE_URL=http://localhost:5000/api

4️⃣ Run Development Server
npm run dev

App will run on http://localhost:5173

🔧 Secure API Communication

All requests to protected endpoints automatically include cookies:

// src/services/apiClient.ts
import axios from "axios";

const apiClient = axios.create({
baseURL: import.meta.env.VITE_API_BASE_URL,
withCredentials: true, // ensures HttpOnly cookies are sent
});

export default apiClient;

🧾 Core Flows
🧍‍♂️ Registration

Users can register as Client, Nutritionist, or Admin.

POST /api/auth/register
{
"name": "Jane Doe",
"email": "jane@email.com",
"password": "StrongPass123!",
"role": "nutritionist"
}

🔑 Login
POST /api/auth/login
{
"email": "jane@email.com",
"password": "StrongPass123!"
}

✅ Backend issues HttpOnly cookies containing tokens.

📋 View Tasks / Meal Plans

Tasks or meal plans are fetched using the secure API client:

const res = await apiClient.get("/tasks");
setTasks(res.data);

❌ Delete (Admin only)

Admins see a delete button:

{user?.role === "admin" && (
<button
onClick={() => handleDelete(task.\_id)}
className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"

>

    Delete

  </button>
)}

If a non-admin user tries to manually trigger deletion via network tab or Postman,
the backend rejects the request with a 403 Forbidden.

🧰 Frontend Security Measures

HttpOnly Cookies for token storage.

No Sensitive Data in Local Storage or session storage.

Automatic token refresh handled server-side.

CSRF Protection through SameSite=Strict cookie configuration.

Role-based Conditional Rendering — Admin-only controls never appear for Clients.

Validation on All Inputs — form data sanitized before sending to API.

🧭 Developer Notes
🔄 Handling Session Expiry

If the access token expires:

Axios interceptors automatically request a new one using the refresh token.

The process is transparent to the user.

🎨 UI/UX Best Practices

Built with responsive design using TailwindCSS.

Accessible color contrast ratios.

Clean layout hierarchy.

Smooth transitions and hover states.

🧪 Available Scripts
Command Description
npm run dev Run app in development mode
npm run build Build production bundle
npm run preview Preview production build
npm run lint Run ESLint checks
🧰 Example Roles in Action
Role Permissions UI Access
Admin Create, View, Delete any task Full dashboard
Nutritionist Create and assign meal plans Limited dashboard
Client View assigned meal plans Read-only view
📦 Future Enhancements

✅ Add profile management and photo upload

✅ Implement dark mode toggle

✅ Integrate real-time meal plan updates using WebSockets

✅ Improve error boundary UX for expired tokens

✅ Add PWA support for offline access

👨‍💻 Author

EatRight Frontend
Developed and maintained by Isama Desmond

Frontend Engineer | UI Security Advocate | React + TypeScript Enthusiast

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
