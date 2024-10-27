import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {  Testimonial } from "../types/types";

// Define the API URL base for testimonials (adjust if needed)
const API_URL = "/api/v1/testimonials";

// Hook to manage testimonial operations
export function useTestimonials() {
  const queryClient = useQueryClient();

  // Fetch all testimonials
  const getAllTestimonials = useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      try {
        const response = await axios.get(`${API_URL}`);
        return response.data as Testimonial[];
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        throw error;
      }
    },
    refetchInterval: false, // Disable refetching
    staleTime: 600000, // Testimonials will stay fresh for 10 minutes
  });

  // Create a new testimonial
  const createTestimonial = useMutation(
   { mutationFn: async (newTestimonial: Partial<Testimonial>) => {
      try {
        const response = await axios.post(`${API_URL}`, newTestimonial);
        return response.data;
      } catch (error) {
        console.error('Error creating testimonial:', error);
        throw error;
      }
    },
    
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey:['testimonials']}); // Refetch testimonials
      },
    }
  );

  // Edit a testimonial
  const editTestimonial = useMutation(
   { mutationFn:  async ({ id, updatedTestimonial }: { id: number; updatedTestimonial: Partial<Testimonial> }) => {
      try {
        const response = await axios.put(`${API_URL}/${id}`, updatedTestimonial);
        return response.data;
      } catch (error) {
        console.error('Error editing testimonial:', error);
        throw error;
      }
    },

      onSuccess: () => {
        queryClient.invalidateQueries({queryKey:['testimonials']}); // Refetch testimonials
      },
    }
  );

  // Delete a testimonial
  const deleteTestimonial = useMutation(
    {mutationFn:   async (id: number) => {
      try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
      } catch (error) {
        console.error('Error deleting testimonial:', error);
        throw error;
      }
    },
    
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey:['testimonials']}); // Refetch testimonials
      },
    }
  );

  return {
    getAllTestimonials,
    createTestimonial,
    editTestimonial,
    deleteTestimonial,
    queryClient,
  };
}
