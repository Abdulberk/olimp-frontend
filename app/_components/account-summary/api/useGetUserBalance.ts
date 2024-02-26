'use client';
import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const fetchBalance = async (id:number) => {
        const response = await fetch(`${baseUrl}/person/bank-account/${id}`);
        if (!response.ok) {
            throw new Error("Error fetching balance");
        }
        return response.json();
}

export const useGetUserBalance = (id:number) => {
    const { data, isLoading, error,status,isError } =  useQuery(
        {
            queryKey:["balance",id],
            queryFn: () => fetchBalance(id),
            refetchInterval: 1000,
        },        
    )

    return {
        data,
        isLoading,
        error,
        status,
        isError
    }
}


