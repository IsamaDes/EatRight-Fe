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

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const payload = {
        healthGoal: form.healthGoal || undefined,
        age: form.age ? Number(form.age) : undefined,
      };

      const res = await updateUserProfile(payload);
      setMessage("Profile updated successfully!");
       setTimeout(() => {
        navigate("/client/profile");
      }, 500);
    } catch (err: any) {
      setMessage(err.message || "Error updating profile");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Update Client Profile</h3>

      <input
        name="healthGoal"
        placeholder="Health Goal"
        value={form.healthGoal}
        onChange={handleChange}
      />

      <input
        name="age"
        placeholder="Age"
        type="number"
        value={form.age}
        onChange={handleChange}
      />

      <button type="submit">Update</button>
      <p>{message}</p>
    </form>
  );
};

export default ClientProfileUpdate;
