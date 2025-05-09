import { API_BASE_URL } from "./config";

export interface Candidate {
  id: number;
  name: string;
  avatar: string;
  title: string;
  location: string;
  experience: string;
  skills: string[];
  education: string;
  bio: string;
}

export const fetchCandidates = async (): Promise<Candidate[]> => {
  const response = await fetch(`${API_BASE_URL}/candidates`, {
    headers: {
      "Accept": "application/ld+json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch candidates: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.member;
};
