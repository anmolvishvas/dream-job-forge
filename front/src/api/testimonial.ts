import { API_BASE_URL } from "./config";

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

export const fetchTestimonials = async (): Promise<Testimonial[]> => {
  const response = await fetch(`${API_BASE_URL}/testimonials`, {
    headers: {
      Accept: "application/ld+json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch testimonials");
  }

  const data = await response.json();
  return data.member;
};
