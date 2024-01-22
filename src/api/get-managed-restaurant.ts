import { api } from "@/lib/axios";

interface GetManagedRestauranResponse {
  id: number;
  name: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  description: string | null;
  managerId: number | null;
}

export async function getManagedRestaurant() {
  const response = await api.get<GetManagedRestauranResponse>(
    "/managed-restaurant",
  );

  return response.data;
}
