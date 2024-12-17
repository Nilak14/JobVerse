import { JVRequest } from "@/lib/JVRequest";
import { useQuery } from "react-query";

export const useQueryEmployeeSearch = (searchQuery: string) => {
  return useQuery({
    queryKey: ["employee-search", searchQuery],
    queryFn: async () =>
      await JVRequest.get(`/api/users/search-employee?search=${searchQuery}`),
    enabled: !!searchQuery && searchQuery.length > 1,
    staleTime: 1 * 60 * 1000, // 1 minutes
    cacheTime: 2 * 60 * 1000, // 2 minutes
  });
};

//staleTime: prevents unnecessary re fetches within the specified time

// cacheTime: keeps the data in memory for the specified duration, which can be useful for quick back-navigation or quick re-rendering
