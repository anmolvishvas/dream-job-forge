import { API_BASE_URL } from "./config";

export interface Company {
  id: number;
  name: string;
  logo: string;
  industry: string;
  location: string;
  employees: string;
  jobs: number;
  description?: string;
}

export const fetchCompanies = async (): Promise<Company[]> => {
  const response = await fetch(`${API_BASE_URL}/companies`, {
    headers: {
      Accept: "application/ld+json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch companies: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();
  return data.member;
};
