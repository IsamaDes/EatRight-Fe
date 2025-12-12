// pages/Clients.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getNutritionistProfile } from "../../services/nutritionistService";

interface CLientUser {
 name: string,
  email: string,
}

type Client = {
  id: string;
  name: string;
  age?: number;
  healthGoal?: string;
  userId: string;
  assignedNutritionistId: string;
  subscription?: any;
  user: CLientUser
};

type NutritionistProfile = {
  certification?: string;
  experienceYears?: number;
  clients: Client[];
};

type NutritionistData = {
  id: string;
  name: string;
  email: string;
  profile: NutritionistProfile;
};

const NutritionistClients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data: NutritionistData = await getNutritionistProfile();
        if (data?.profile?.clients) {
          setClients(data.profile.clients);
        } else {
          setClients([]);
        }
      } catch (err) {
        console.error("Failed to fetch clients:", err);
        setError("Failed to load clients");
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleCreateMealPlan = (clientId: string, clientName: string) => {
    const encodedName = encodeURIComponent(clientName);
    navigate(`/nutritionist/create-mealplan/${clientId}/${encodedName}`);
  };

  if (loading) return <p>Loading clients...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (clients.length === 0) return <p>No clients assigned yet.</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Clients</h1>
      <ul className="space-y-2">
        {clients.map((client) => (
          <li
            key={client.id}
            className="flex justify-between items-center p-3 border rounded"
          >
            <div>
              <p><strong>Name:</strong> {client.user.name}</p>
              <p><strong>Age:</strong> {client.age || "N/A"}</p>
              <p><strong>Health Goal:</strong> {client.healthGoal || "N/A"}</p>
            </div>
            <button
              onClick={() => handleCreateMealPlan(client.id, client.user.name)}
              className="px-3 py-1 bg-green-600 text-white rounded"
            >
              Create Meal Plan
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NutritionistClients;

