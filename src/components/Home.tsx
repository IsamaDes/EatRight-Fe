import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = () => navigate("/register");

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex flex-col items-center justify-center px-6 text-center">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          Welcome to <span className="text-green-600">EatGood</span> 🌿
        </h1>

        <p className="text-gray-600 text-lg md:text-xl mb-8 leading-relaxed">
          Your personalized path to a healthier lifestyle.  
          Get curated meal plans, expert advice, and wellness tracking — all in one place.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleNavigate}
          className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-green-700 transition-all duration-300 mx-auto"
        >
          Get Started
          <ArrowRight size={20} />
        </motion.button>
      </motion.div>

      {/* Subtle Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-6 text-gray-400 text-sm"
      >
        © {new Date().getFullYear()} EatGood — Nourish. Thrive. Live Well.
      </motion.footer>
    </div>
  );
};

export default Home;
