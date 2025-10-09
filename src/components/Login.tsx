
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../utils/AuthContext";
import healthyfood from "../assets/healthyfoodimg.jpg";
import { Eye, EyeOff, Loader2 } from 'lucide-react';


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await loginUser({ email, password });
      const userRole =  response.data.role;
      const token =  response.data.token

      setRole(userRole);

      localStorage.setItem("role", userRole);
      localStorage.setItem("access_token", token);

      if (userRole === "admin") navigate("/admin/dashboard");
      else if (userRole === "nutritionist") navigate("/nutritionist/dashboard");
      else if (userRole === "client") navigate("/client");
      else navigate("/login");

    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section – Image */}
      <div className="relative w-full md:w-1/2 h-64 md:h-auto">
        <img
          src={healthyfood}
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

      {/* Right Section – Form */}
      <div className="flex-1 flex flex-col justify-center px-8 py-10 bg-gradient-to-br from-white to-gray-50 shadow-inner">
        <div className="max-w-sm w-full mx-auto">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Welcome Back 👋</h2>
          <p className="text-gray-500 mb-8">
            Login to your account to continue your healthy journey.
          </p>

          {error && (
            <div className="text-red-600 bg-red-50 border border-red-200 rounded-md p-2 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="relative">
           <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>

            <div className="flex-1">
              <input
                type={visiblePassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition"
                placeholder="Enter your password"
                required
              />
            </div>
            <button type="button" 
            onClick={() => setVisiblePassword((previous) => !previous)} 
            className="absolute right-3 top-9 text-gray-500 hover:text-gray-700">
            {visiblePassword ? <EyeOff size={18} /> : <Eye size={18}/>}
            </button>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2.5 rounded-md font-semibold hover:bg-green-700 transition disabled:bg-green-400"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <a href="/register" className="text-green-600 font-medium hover:underline">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
