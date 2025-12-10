import { useState } from "react";
import { updateUserProfile } from "../../services/userService";
import { useNavigate } from "react-router-dom";

const NutritionistProfileUpdate = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    certification: "",
    experienceYears: "",
  });

  const [message, setMessage] = useState<{ text: string; type: "success" | "error" | "" }>({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const payload = {
        certification: form.certification || undefined,
        experienceYears: form.experienceYears ? Number(form.experienceYears) : undefined,
      };

      await updateUserProfile(payload);

      setMessage({ text: "Profile updated successfully!", type: "success" });
      setTimeout(() => {
        navigate("/nutritionist/profile");
      }, 1000);
    } catch (err: any) {
      setMessage({ text: err.message || "Error updating profile", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Update Nutritionist Profile</h2>

      {message.text && (
        <div
          className={`mb-4 p-3 rounded ${
            message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Specialization</label>
          <input
            type="text"
            name="certification"
            value={form.certification}
            onChange={handleChange}
            placeholder="e.g., Registered Dietitian"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Years of Experience</label>
          <input
            type="number"
            name="experienceYears"
            value={form.experienceYears}
            onChange={handleChange}
            placeholder="e.g., 5"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
            min={0}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 text-white py-2 rounded-lg shadow hover:bg-emerald-700 transition disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default NutritionistProfileUpdate;
