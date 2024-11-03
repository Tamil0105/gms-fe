import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
type Portfolio = {
    id: number;
    url: string;
  };
export function usePortfolio() {
  const queryClient = useQueryClient();

  // Fetch all carousel items (READ)
  const getportfolio = useQuery({
    queryKey: ['portfolio'],
    queryFn: async () => {
      try {
        const response = await axios.get(`/api/v1/portfolio`);
        return response.data as Portfolio[];
      } catch (error) {
        console.error('Error fetching portfolio:', error);
        throw error;
      }
    },
    staleTime: 600000, // 10 minutes
  });

  // Create a new carousel item (CREATE)
  const createPortfolio = useMutation({
    mutationFn: async (newCarousel: Omit<Portfolio, 'id'>) => {
      const response = await axios.post(`/api/v1/portfolio`, newCarousel);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] }); // Refetch portfolio after creating a new one
    },
  });

  // Update a carousel item (UPDATE)
  const updatePortfolio = useMutation({
    mutationFn: async ({ id, updatedCarousel }: { id: number, updatedCarousel: Omit<Portfolio, 'id'> }) => {
      const response = await axios.put(`/api/v1/portfolio/${id}`, updatedCarousel);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] }); // Refetch portfolio after updating
    },
  });

  // Delete a carousel item (DELETE)
  const deletePortfolio = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`/api/v1/portfolio/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] }); // Refetch portfolio after deleting
    },
  });

  return {
    getportfolio,
    createPortfolio,
    updatePortfolio,
    deletePortfolio,
    queryClient,
  };
}
