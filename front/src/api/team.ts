import { API_BASE_URL } from "./config";

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  description: string;
}

export const fetchTeamMembers = async (): Promise<TeamMember[]> => {
  const response = await fetch(`${API_BASE_URL}/team_members`, {
    headers: {
      "Accept": "application/ld+json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch team members");
  }

  const data = await response.json();
  return data.member;
};
