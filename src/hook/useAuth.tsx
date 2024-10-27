import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Login, User } from "../types/types";
import { useNavigate } from "react-router-dom";
export function useAuth(){
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const login = useMutation({
		mutationFn: async (loginData: Login) => {
			try {
				const response = await axios.post('/api/v1/auth/login', loginData);
				if(response.data.access_token){
					localStorage.setItem('token', response.data.access_token);
					navigate('/testimonials'); // Redirect to contacts page
					// Store token in local storage	
				}
      
				return response.data;
			} catch (error) {
				console.error('Error creating response:', error);
				throw error;
			}
		},
        retry: false,
		// onSettled: () => {
		// 	queryClient.invalidateQueries({ queryKey: ['level-scores'] });
		// },
	});
	const verifyEmail = useMutation({
		mutationFn: async ({ email }: { email:string}) => {
		  try {
			const response = await axios.post(`/api/v1/users/verify`,{},{params:{
				email
			}} );
			return response.data as any;
		  } catch (error) {
			console.error('Error updating contact:', error);
			throw error;
		  }
		},
	
	  })
	  const verifiedEmail = useMutation({
		mutationFn: async ({ token }: { token:string}) => {
		  try {
			const response = await axios.post(`/api/v1/users/verified`,{},{     headers: {
				Authorization: `Bearer ${token}` // Include the Bearer token in headers
			  }} );
			return response.data as any;
		  } catch (error) {
			console.error('Error updating contact:', error);
			throw error;
		  }
		},
	
	  })
	  const getUser = useQuery({
		queryKey: ['user'],
		queryFn: async () => {
		  try {
			const response = await axios.get(`/api/v1/users/1`);
			return response.data as User[];
		  } catch (error) {
			console.error('Error fetching contacts:', error);
			throw error;
		  }
		},
		refetchInterval: false,  // Disable periodic refetch
		staleTime: 600000,  // Cache data for 10 minutes
	  });
    return {
        login,queryClient,
		verifiedEmail,
		verifyEmail,
		getUser
    }
}