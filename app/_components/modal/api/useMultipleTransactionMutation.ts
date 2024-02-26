import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const sendTransaction = async (transaction: any) => {
    const response = await fetch(`${baseUrl}/transaction/batch-process`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);

    }

    return response.json();
}

export const useMultipleTransactionMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn:(transaction: any) => sendTransaction(transaction),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["recipients"] });
         
        },
        onError: (error: Error) => {
          console.log(error);

        },
      })
}

