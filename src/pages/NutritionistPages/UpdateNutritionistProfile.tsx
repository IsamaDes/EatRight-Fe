import { useState } from "react";
import { updateUserProfile } from "../../services/userService";
import { useNavigate } from "react-router-dom";

const NutritionistProfileUpdate = () => {
    const navigate = useNavigate();
  const [form, setForm] = useState({
    certification: "",
    experienceYears: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const payload = {
        certification: form.certification || undefined,
        experienceYears: form.experienceYears
          ? Number(form.experienceYears)
          : undefined,
      };

      const res = await updateUserProfile(payload);
      setMessage("Profile updated successfully!");
       setTimeout(() => {
        navigate("/nutritionist/profile");
      }, 500);
    } catch (err: any) {
      setMessage(err.message || "Error updating profile");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Update Nutritionist Profile</h3>

      <input
        name="certification"
        placeholder="Certification"
        value={form.certification}
        onChange={handleChange}
      />

      <input
        name="experienceYears"
        placeholder="Years of Experience"
        type="number"
        value={form.experienceYears}
        onChange={handleChange}
      />

      <button type="submit">Update</button>
      <p>{message}</p>
    </form>
  );
};

export default NutritionistProfileUpdate;
