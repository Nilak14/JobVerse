import { kyInstance } from "@/lib/ky";
import { NotificationAPIResponse } from "@/lib/prisma-types/Notification";
import { useInfiniteQuery } from "react-query";

export const useNotificationInfinityQuery = () => {
  return useInfiniteQuery({
    queryKey: ["notifications"],
    queryFn: async ({ pageParam }) =>
      kyInstance
        .get(
          "/api/notifications",
          pageParam ? { searchParams: { cursor: pageParam } } : {}
        )
        .json<NotificationAPIResponse>(),
    getNextPageParam: (lastPage) => lastPage?.data?.nextCursor ?? undefined,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};
