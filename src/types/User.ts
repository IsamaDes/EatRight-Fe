export type UserRole = "client" | "nutritionist" | "admin";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  age?: number | null;
  healthHistory: string[];
  wellness_goal?: string | null;
  createdAt?: string;
  updatedAt?: string;
}
