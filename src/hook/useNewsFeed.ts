import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { NewsFeed } from "../types/types"; // Ensure you have NewsFeed type defined

export function useNewsFeed() {
  const queryClient = useQueryClient();

  // Fetch all news feeds (READ)
  const getNewsFeeds = useQuery({
    queryKey: ['newsfeeds'],
    queryFn: async () => {
      try {
        const response = await axios.get(`/api/v1/newsfeed`);
        return response.data as NewsFeed[];
      } catch (error) {
        console.error('Error fetching news feeds:', error);
        throw error;
      }
    },
    staleTime: 600000, // 10 minutes
  });

  // Create a new news feed (CREATE)
  const createNewsFeed = useMutation({
    mutationFn: async (newNewsFeed: Omit<NewsFeed, 'id'>) => {
      const response = await axios.post(`/api/v1/newsfeed`, newNewsFeed);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['newsfeeds']}); // Refetch news feeds after creating a new one
    },
  });

  // Update a news feed (UPDATE)
  const updateNewsFeed = useMutation({
    mutationFn: async ({ id, updatedNewsFeed }: { id: number, updatedNewsFeed: Omit<NewsFeed, 'id'> }) => {
      const response = await axios.put(`/api/v1/newsfeed/${id}`, updatedNewsFeed);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['newsfeeds']}); // Refetch news feeds after updating
    },
  });

  // Delete a news feed (DELETE)
  const deleteNewsFeed = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`/api/v1/newsfeed/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['newsfeeds']}); // Refetch news feeds after deleting
    },
  });

  return {
    getNewsFeeds,
    createNewsFeed,
    updateNewsFeed,
    deleteNewsFeed,
    queryClient,
  };
}
