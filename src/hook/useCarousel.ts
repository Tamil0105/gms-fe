import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
type Carousel = {
    id: number;
    url: string;
  };
export function useCarousel() {
  const queryClient = useQueryClient();

  // Fetch all carousel items (READ)
  const getCarousels = useQuery({
    queryKey: ['carousels'],
    queryFn: async () => {
      try {
        const response = await axios.get(`/api/v1/carousel`);
        return response.data as Carousel[];
      } catch (error) {
        console.error('Error fetching carousels:', error);
        throw error;
      }
    },
    staleTime: 600000, // 10 minutes
  });

  // Create a new carousel item (CREATE)
  const createCarousel = useMutation({
    mutationFn: async (newCarousel: Omit<Carousel, 'id'>) => {
      const response = await axios.post(`/api/v1/carousel`, newCarousel);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['carousels'] }); // Refetch carousels after creating a new one
    },
  });

  // Update a carousel item (UPDATE)
  const updateCarousel = useMutation({
    mutationFn: async ({ id, updatedCarousel }: { id: number, updatedCarousel: Omit<Carousel, 'id'> }) => {
      const response = await axios.put(`/api/v1/carousel/${id}`, updatedCarousel);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['carousels'] }); // Refetch carousels after updating
    },
  });

  // Delete a carousel item (DELETE)
  const deleteCarousel = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`/api/v1/carousel/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['carousels'] }); // Refetch carousels after deleting
    },
  });

  return {
    getCarousels,
    createCarousel,
    updateCarousel,
    deleteCarousel,
    queryClient,
  };
}
