import { API_BASE_URL } from "./config";

export interface Stat {
  id: number;
  number: string;
  label: string;
}

export const fetchStats = async (): Promise<Stat[]> => {
  const response = await fetch(`${API_BASE_URL}/stats`, {
    headers: {
      Accept: "application/ld+json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch stats");
  }

  const data = await response.json();
  return data.member;
};
