import { JVRequest } from "@/lib/JVRequest";
import { useQuery } from "react-query";

export const useQueryAllCompanies = () => {
  return useQuery({
    queryKey: ["companies"],

    queryFn: async () => await JVRequest.get("/api/companies"),
  });
};
