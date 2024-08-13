import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { convertAmountFromMilliunit } from "@/lib/utils";

export const useGetTransactionById = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["transactions", { id }],
    queryFn: async () => {
      const response = await client.api.transactions[":id"].$get({
        param: { id },
      });

      if (!response.ok) {
        throw new Error("Faild to fetch transaction by id");
      }
      const { data } = await response.json();
      return {
        ...data,
        amount: convertAmountFromMilliunit(data.amount),
      };
    },
  });

  return query;
};
