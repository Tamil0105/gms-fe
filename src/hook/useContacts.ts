import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Hook for handling contacts CRUD operations
export function useContacts() {
  const queryClient = useQueryClient();

  // Fetch contacts
  const getContacts =(page:number, limit:number)=> useQuery({
    queryKey: ['contacts'], // Add page and limit to the query key for caching
    queryFn: async () => {
      try {
        const response = await axios.get(`/api/v1/contacts`, {
          params: { page, limit }, // Send page and limit as query parameters
        });
        return response.data; // Adjust based on your response structure
      } catch (error) {
        console.error('Error fetching contacts:', error);
        throw error;
      }
    },
    refetchInterval: false,  // Disable periodic refetch
    staleTime: 600000,  // Cache data for 10 minutes
  });

  // Delete contact by ID
  const deleteContact = useMutation({
    mutationFn: async (contactId: number) => {
      try {
        await axios.delete(`/api/v1/contacts/${contactId}`);
      } catch (error) {
        console.error('Error deleting contact:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['contacts']});  // Refetch contacts after deleting
    },
  });

  // Update contact (e.g., updating the isRead status)
  const updateContact = useMutation({
    mutationFn: async ({ ids, isRead }: { ids: number[]; isRead: boolean }) => {
      try {
        console.log(1)
        const response = await axios.patch(`/api/v1/contacts`, {ids, isRead });
        console.log(2)
        return response
      } catch (error) {
        console.error('Error updating contact:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['contacts']});  // Refetch contacts after updating
    },
  });

  return {
    getContacts,
    deleteContact,
    updateContact,
    queryClient,
  };
}
