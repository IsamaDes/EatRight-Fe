


import { useState } from "react";
import { updateUserProfile } from "../../services/userService";
import { useNavigate } from "react-router-dom";

const ClientProfileUpdate = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    healthGoal: "",
    age: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        healthGoal: form.healthGoal || undefined,
        age: form.age ? Number(form.age) : undefined,
      };

      await updateUserProfile(payload);
      setMessage("Profile updated successfully!");
      setTimeout(() => {
        navigate("/client/profile");
      }, 1000);
    } catch (err: any) {
      setMessage(err.message || "Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Update Your Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Health Goal */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Health Goal
            </label>
            <input
              type="text"
              name="healthGoal"
              value={form.healthGoal}
              onChange={handleChange}
              placeholder="Enter your health goal"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none transition"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Age</label>
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              placeholder="Enter your age"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none transition"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition disabled:opacity-50`}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>

          {/* Message */}
          {message && (
            <p className="text-center text-sm text-green-600 font-medium mt-2">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ClientProfileUpdate;