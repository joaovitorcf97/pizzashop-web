import { api } from "@/lib/axios";

interface GetProfileResponse {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  role: "manager" | "customer";
}

export async function getProfile() {
  const response = await api.get<GetProfileResponse>("/me");

  return response.data;
}
