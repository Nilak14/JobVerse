import { updateCompany } from "@/actions/companies/updateCompany";
import { EmployerCompaniesResponse } from "@/lib/prisma-types/Employers";
import { useUploadThing } from "@/lib/uploadthing";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useQueryClient } from "react-query";
import { toast } from "sonner";
import React from "react";

const useUpdateCompanyAction = ({
  setLoading,
  setCompanyAvatar,
}: {
  setLoading: (state: boolean) => void;
  setCompanyAvatar: (url: string | null) => void;
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { startUpload } = useUploadThing("companyLogo");
  const updateCompanyAction = useAction(updateCompany, {
    onExecute: () => {
      setLoading(true);
      toast.loading("Updating Details....", { id: "update-company" });
    },
    onError: () => {
      toast.error("Something Went Wrong", { id: "update-company" });
      setLoading(false);
    },
    onSuccess: async ({ data, input }) => {
      let newAvatarUrl: string | null | undefined = null;
      if (data?.success && data.data?.company) {
        if (input.logo) {
          const logo = input.logo
            ? new File([input.logo], `logo_avatar_${data.data.company.id}.webp`)
            : undefined;
          const uploadResult = logo && (await startUpload([logo]));
          newAvatarUrl = uploadResult?.[0].serverData.cdnFileUrl;
          setCompanyAvatar(newAvatarUrl!);
        }
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
                message: "Error in updating Company",
              };
            }
            data.data.company.logoUrl =
              newAvatarUrl || data.data.company.logoUrl;
            return {
              data: {
                companies: oldData.data.companies.map((c) => {
                  if (c.id === data.data.company.id) {
                    c.name = data.data.company.name;
                    c.description = data.data.company.description;
                    c.logoUrl = data.data.company.logoUrl;
                    c.website = data.data.company.website;
                  }
                  return c;
                }),
              },
              success: oldData.success,
              message: oldData.message,
            };
          }
        );
        setLoading(false);
        router.refresh();
        toast.success(data.message, { id: "update-company" });
      } else {
        setLoading(false);
        toast.error(data?.message || "Something Went Wrong", {
          id: "update-company",
        });
      }
    },
  });

  return updateCompanyAction;
};

export default useUpdateCompanyAction;
