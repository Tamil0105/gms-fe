import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from 'react-hot-toast';
import { Contact, } from "../types/types";
export function useImageUpload(){
    const queryClient = useQueryClient();
    const getContacts= 
		useQuery({
			queryKey: ['contacts'],
			queryFn: async () => {
				try {
					const response = await axios.get(
						`/api/v1/contacts`,
					);
					console.log(response.data);
					return response.data as Contact[];
				} catch (error) {
					console.error('Error fetching test by ID:', error);
					throw error;
				}
			},
			refetchInterval: false,
			staleTime: 600000,
		});
        const uploadFile = useMutation({
            mutationFn: async (param: { file: FormData,folderKey:string }) => {
                try {
                    // console.log(param);
                    const res = await axios.post<any>(`/api/v1/image-upload`, param.file,{params:{
                        folderKey:param.folderKey
                    }});
                    return res.data;
                } catch (error) {
                    console.log(error);
                    throw error;
                }
            },
    
            onSuccess: () => {
                console.log('image uploaded successfully...');
                // queryClient.invalidateQueries({ queryKey: ['getAssessment'] });
            },
            onError: (error) => {
                toast.error(error.message ?? 'Sorry, Failed to Update a image please try again');
            },
        });
        const updateFile= useMutation({
            mutationFn: async (param: { file: FormData; oldKey: string,folderKey:string }) => {
                try {
                    // console.log(param);
                    const res = await axios.put<any>(`/api/v1/image-upload`, param.file, {
                        params: {
                            oldKey: param.oldKey,
                        },
                    });
                    return res.data;
                } catch (error) {
                    console.log(error);
                    throw error;
                }
            },
    
            onSuccess: () => {
                console.log('uploaded image updated successfully...');
                // queryClient.invalidateQueries({ queryKey: ['getAssessment'] });
            },
            onError: (error) => {
                toast.error(error.message ?? 'Sorry, Failed to Update a image please try again');
            },
        });
        const deleteFile = useMutation({
            mutationFn: async (param: { fileKey: string,folderKey:string }) => {
                try {
                    // console.log(param);
                    const res = await axios.delete<any>(`/api/v1/image-upload`, { params: param });
                    return res.data;
                } catch (error) {
                    console.log(error);
                    throw error;
                }
            },
    
            onSuccess: () => {
                console.log('uploaded deleted successfully...');
                // queryClient.invalidateQueries({ queryKey: ['getAssessment'] });
            },
            onError: (error) => {
                toast.error(error.message ?? 'Sorry, Failed to Update a image please try again');
            },
        });
    return {
        getContacts,queryClient,updateFile,uploadFile,deleteFile
    }
}