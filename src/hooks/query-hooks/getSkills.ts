import { useQuery } from "react-query";

export const useQueryGetSkills = () => {
  return useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const res = await fetch("/skills.json");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return await res.json();
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};
