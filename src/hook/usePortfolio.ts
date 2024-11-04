import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { PortFolio } from "../types/types";

export function usePortfolio() {
  const queryClient = useQueryClient();

  // Fetch all carousel items (READ)
  const getportfolio = useQuery({
    queryKey: ['portfolio'],
    queryFn: async () => {
      try {
        const response = await axios.get(`/api/v1/portfolio`);
        return response.data as PortFolio[];
      } catch (error) {
        console.error('Error fetching portfolio:', error);
        throw error;
      }
    },
    staleTime: 600000, // 10 minutes
  });

  // Create a new carousel item (CREATE)
  const createPortfolio = useMutation({
    mutationFn: async (newdPortfolio: Omit<PortFolio, 'id'>) => {
      const response = await axios.post(`/api/v1/portfolio`, newdPortfolio);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] }); // Refetch portfolio after creating a new one
    },
  });

  // Update a carousel item (UPDATE)
  const updatePortfolio = useMutation({
    mutationFn: async ({ id, updatedPortfolio }: { id: number, updatedPortfolio: Omit<PortFolio, 'id'> }) => {
      const response = await axios.put(`/api/v1/portfolio/${id}`, updatedPortfolio);
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
