import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { useSearchParams } from "next/navigation";
import { convertAmountFromMilliunit } from "@/lib/utils";

export const useGetSummary = () => {
  const params = useSearchParams();
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const accountId = params.get("accountId") || "";

  const query = useQuery({
    //TODO: check if params are needed in the queryKey
    queryKey: ["summary", { from, to, accountId }],
    queryFn: async () => {
      const response = await client.api.summary.$get({
        query: {
          from,
          to,
          accountId,
        },
      });

      if (!response.ok) {
        throw new Error("Faild to fetch summary");
      }
      const { data } = await response.json();
      return {
        ...data,
        incomeAmount: convertAmountFromMilliunit(data.incomeAmount),
        expensesAmount: convertAmountFromMilliunit(data.expensesAmount),
        remainingAmount: convertAmountFromMilliunit(data.remainingAmount),
        categories: data.categories.map((category) => ({
          ...category,
          value: convertAmountFromMilliunit(category.value),
        })),
        days: data.days.map((day) => ({
          ...day,
          income: convertAmountFromMilliunit(day.income),
          expenses: convertAmountFromMilliunit(day.expenses),
        })),
      };
    },
  });

  return query;
};
