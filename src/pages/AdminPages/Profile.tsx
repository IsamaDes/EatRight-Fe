import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getAdminProfile } from "../../services/adminService";

interface AdminProfileData {
  id: string;
  roleDescription?: string | null;
  permissions?: string[];
  user: {
    name: string;
    email: string;
    role: string;
  };
}

const AdminProfilePage = () => {
  const [profile, setProfile] = useState<AdminProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getAdminProfile();
        const data = res.data;

        setProfile({
          id: data.id,
          user: {
            name: data.name,
            email: data.email,
            role: data.role,
          },
          roleDescription: data.profile?.roleDescription || null,
          permissions: data.profile?.permissions || [],
        });

        toast.success("Admin profile loaded successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } catch (err: any) {
        toast.error(err.message || "Failed to fetch admin profile", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading admin profile...</p>;
  if (!profile) return <p className="text-center mt-10 text-red-500">No profile data available.</p>;

  return (
    <div className="max-w-2xl p-6 shadow-lg rounded-xl mt-10">
     
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Admin Profile</h2>

      <div className="flex flex-col gap-4">
        <div className="p-4 bg-green-50 rounded-lg shadow-sm">
          <span className="font-semibold">Name:</span> {profile.user.name || "Not provided"}
        </div>
        <div className="p-4 bg-green-50 rounded-lg shadow-sm">
          <span className="font-semibold">Email:</span> {profile.user.email || "Not provided"}
        </div>
        <div className="p-4 bg-green-50 rounded-lg shadow-sm">
          <span className="font-semibold">Role:</span> {profile.user.role || "Not provided"}
        </div>
        <div className="p-4 bg-green-50 rounded-lg shadow-sm">
          <span className="font-semibold">Role Description:</span> {profile.roleDescription || "Not provided"}
        </div>
        <div className="p-4 bg-green-50 rounded-lg shadow-sm col-span-full">
          <span className="font-semibold">Permissions:</span>{" "}
          {profile.permissions && profile.permissions.length > 0
            ? profile.permissions.join(", ")
            : "Not provided"}
        </div>
      </div>
    </div>
  );
};

export default AdminProfilePage;
