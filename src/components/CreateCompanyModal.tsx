"use client";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "@/components/ui/responsive-dailog";
import { ExtendedUser } from "@/next-auth";
import AvatarInput from "./Global/AvatarInput";
import { useState } from "react";
import { Label } from "./ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { CompanySchema, CompanySchemaType } from "@/schema/CompanySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import LoadingButton from "./ui/loading-button";
import { useAction } from "next-safe-action/hooks";
import { createCompany } from "@/actions/createCompany";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useQueryClient } from "react-query";
interface CreateCompanyModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: ExtendedUser;
}

const CreateCompanyModal = ({
  open,
  setOpen,
  user,
}: CreateCompanyModalProps) => {
  const [croppedAvatar, setCroppedAvatar] = useState<Blob | null>(null);
  const queryClient = useQueryClient();
  const form = useForm<CompanySchemaType>({
    defaultValues: {
      name: "",
      description: "",
      websiteURl: undefined,
    },
    resolver: zodResolver(CompanySchema),
    mode: "onChange",
  });
  const router = useRouter();

  const { execute, status } = useAction(createCompany, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        toast.success(data.message, { id: "create-company" });
        router.push("/employer/dashboard");
        queryClient.invalidateQueries({ queryKey: ["companies"] });
        setOpen(false);
      } else {
        toast.error(data?.message, { id: "create-company" });
      }
    },
    onError: () => {
      toast.error("Could not create company at this moment, Please try again", {
        id: "create-company",
      });
    },
  });

  const onSubmit = (data: CompanySchemaType) => {
    execute(data);
  };
  return (
    <ResponsiveModal open={open} onOpenChange={setOpen}>
      <ResponsiveModalContent>
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>Create Company</ResponsiveModalTitle>
        </ResponsiveModalHeader>
        <ResponsiveModalDescription className="sr-only">
          Enter your company details
        </ResponsiveModalDescription>
        <div className="space-y-1.5">
          <Label>Avatar</Label>
          <AvatarInput
            src={
              croppedAvatar
                ? URL.createObjectURL(croppedAvatar)
                : "/avatar-placeholder.png"
            }
            onImageCropped={setCroppedAvatar}
          />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter Company Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Say Something about Your Company"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="websiteURl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website Url</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Company Website URL" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ResponsiveModalFooter>
              <LoadingButton type="submit" loading={status === "executing"}>
                Create Company
              </LoadingButton>
            </ResponsiveModalFooter>
          </form>
        </Form>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};
export default CreateCompanyModal;
