import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetcategoryById = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["category", { id }],
    queryFn: async () => {
      const response = await client.api.categories[":id"].$get({
        param: { id },
      });

      if (!response.ok) {
        throw new Error("Faild to fetch category by id");
      }
      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
