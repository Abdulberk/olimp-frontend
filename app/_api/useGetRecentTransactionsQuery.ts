'use client';
import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const fetchRecentTransactions = async (personId:number) => {
        const response = await fetch(`${baseUrl}/transaction/recent-transactions/${personId}`);
        if (!response.ok) {
            throw new Error("Error fetching transactions");
        }
        return response.json();
}


export const useGetRecentTransactionsQuery = (personId:number) => {
    const { data, isLoading, error,status,isError } =  useQuery(
        {
            queryKey:["recentTransactions",personId],
            queryFn: () => fetchRecentTransactions(personId),
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