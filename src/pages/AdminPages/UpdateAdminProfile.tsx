// src/components/profile/AdminProfileUpdate.tsx
import { useState } from "react";
import { updateUserProfile } from "../../services/userService";
import { useNavigate } from "react-router-dom";

const AdminProfileUpdate = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    permissions: "",
    roleDescription: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const payload = {
        roleDescription: form.roleDescription || undefined,
        permissions: form.permissions
          ? form.permissions.split(",").map((p) => p.trim())
          : undefined,
      };

      const res = await updateUserProfile(payload);
      
      setMessage("Profile updated successfully!");
       setTimeout(() => {
        navigate("/admin/profile");
      }, 500);
    } catch (err: any) {
      setMessage(err.message || "Error updating profile");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Update Admin Profile</h3>

      <input
        name="roleDescription"
        placeholder="Role Description"
        value={form.roleDescription}
        onChange={handleChange}
      />

      <input
        name="permissions"
        placeholder="Comma separated permissions: create-user, delete-user"
        value={form.permissions}
        onChange={handleChange}
      />

      <button type="submit">Update</button>
      <p>{message}</p>
    </form>
  );
};

export default AdminProfileUpdate;
