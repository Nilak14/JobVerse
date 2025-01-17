import { createCompany } from "@/actions/companies/createCompany";
import {
  EmployerCompany,
  EmployerCompaniesResponse,
} from "@/lib/prisma-types/Employers";

import { useUploadThing } from "@/lib/uploadthing";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useQueryClient } from "react-query";
import { toast } from "sonner";

const useCreateCompanyAction = ({
  setLoading,
}: {
  setLoading: (state: boolean) => void;
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { startUpload } = useUploadThing("companyLogo");
  const createCompanyAction = useAction(createCompany, {
    onExecute: () => {
      toast.loading("Creating company...", { id: "create-company" });
    },
    onError: () => {
      toast.error("Could not create company at this moment, Please try again", {
        id: "create-company",
      });
      setLoading(false);
    },
    onSuccess: async ({ data, input }) => {
      setLoading(true);
      if (data?.success) {
        const logo = input.logo
          ? new File([input.logo], `logo_avatar_${data.data.company.id}.webp`)
          : undefined;

        const uploadResult = logo && (await startUpload([logo]));
        const newAvatarUrl = uploadResult?.[0].serverData.logoUrl;
        //todo: update the company logo to all the company job post cache
        const queryKey = ["companies"];
        await queryClient.cancelQueries(queryKey);
        queryClient.setQueryData<EmployerCompaniesResponse>(
          queryKey,
          (oldData) => {
            if (!oldData || !data.data) {
              return {
                data: {
                  companies: [],
                },
                success: false,
                message: "Could not fetch companies",
              };
            }
            data.data.company.logoUrl = newAvatarUrl!;
            return {
              data: {
                companies: [
                  ...oldData.data.companies,
                  data.data.company as EmployerCompany,
                ],
              },
              success: oldData.success,
              message: oldData.message,
            };
          }
        );
        router.refresh();
        setLoading(false);
        toast.success(data.message, { id: "create-company" });
      } else {
        setLoading(false);
        toast.error(data?.message, { id: "create-company" });
      }
    },
  });
  return createCompanyAction;
};
export default useCreateCompanyAction;
