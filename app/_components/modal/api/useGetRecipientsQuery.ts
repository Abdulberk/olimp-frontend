'use client';
import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";



const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const fetchRecipients = async () => {
    const response = await fetch(`${baseUrl}/person/all-persons`);  
    if (!response.ok) {
        throw new Error("Error fetching recipients");
    }

    return response.json();

}

export const useGetRecipients = () => {

    
     const { data, isLoading, error,refetch,status,isError } =  useQuery(
        {
            queryKey:["recipients"],
            queryFn: fetchRecipients,
        },        
    )

    return {
        data,
        isLoading,
        error,
        refetch,
        status,
        isError
        
    }

}


