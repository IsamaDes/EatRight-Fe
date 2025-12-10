// import { useState } from "react";
// import { updateUserProfile } from "../../services/userService";
// import { useNavigate } from "react-router-dom";

// const UpdateAdminProfile = () => {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     permissions: "",
//     roleDescription: "",
//   });

//   const [message, setMessage] = useState("");

//   const handleChange = (e: any) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     try {
//       const payload = {
//         roleDescription: form.roleDescription || undefined,
//         permissions: form.permissions
//           ? form.permissions.split(",").map((p) => p.trim())
//           : undefined,
//       };

//       const res = await updateUserProfile(payload);
      
//       setMessage("Profile updated successfully!");
//        setTimeout(() => {
//         navigate("/admin/profile");
//       }, 500);
//     } catch (err: any) {
//       setMessage(err.message || "Error updating profile");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h3>Update Admin Profile</h3>

//       <input
//         name="roleDescription"
//         placeholder="Role Description"
//         value={form.roleDescription}
//         onChange={handleChange}
//       />

//       <input
//         name="permissions"
//         placeholder="Comma separated permissions: create-user, delete-user"
//         value={form.permissions}
//         onChange={handleChange}
//       />

//       <button type="submit">Update</button>
//       <p>{message}</p>
//     </form>
//   );
// };

// export default UpdateAdminProfile;








import { useState } from "react";
import { updateUserProfile } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateAdminProfile = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    permissions: "",
    roleDescription: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        roleDescription: form.roleDescription || undefined,
        permissions: form.permissions
          ? form.permissions.split(",").map((p) => p.trim())
          : undefined,
      };

      await updateUserProfile(payload);

      toast.success("Profile updated successfully!");
      setTimeout(() => {
        navigate("/admin/profile");
      }, 800);
    } catch (err: any) {
      toast.error(err.message || "Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mt-10 bg-white p-8 rounded-lg">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Update Admin Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 mb-2">Role Description</label>
          <input
            name="roleDescription"
            placeholder="Describe the admin role"
            value={form.roleDescription}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Permissions</label>
          <input
            name="permissions"
            placeholder="Comma separated: create-user, delete-user"
            value={form.permissions}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <p className="text-sm text-gray-500 mt-1">
            Separate multiple permissions with commas.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 bg-green-600 text-white font-semibold rounded-md shadow hover:bg-green-700 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default UpdateAdminProfile;
