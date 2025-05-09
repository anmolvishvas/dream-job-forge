import { API_BASE_URL } from "./config";

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  posted: string;
  logo: string;
  tags: string[];
  description?: string;
  requirements?: string[];
  responsibilities?: string[];
  benefits?: string[];
}

export const fetchJobs = async (): Promise<Job[]> => {
  const response = await fetch(`${API_BASE_URL}/jobs`, {
    headers: {
      Accept: "application/ld+json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch jobs: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();
  return data.member;
};
