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
import { useEffect, useState } from "react";
import { CompanySchema, CompanySchemaType } from "@/schema/CompanySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import useCreateCompanyAction from "@/hooks/use-actions/useCreateCompanyAction";
import { Label } from "../ui/label";
import AvatarInput from "@/components/Global/AvatarInput";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/loading-button";
import { useForm } from "react-hook-form";
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<CompanySchemaType>({
    defaultValues: {
      name: "",
      description: "",
      websiteURl: undefined,
      logo: undefined,
    },
    resolver: zodResolver(CompanySchema),
    mode: "onChange",
  });

  const { execute, status } = useCreateCompanyAction({
    setLoading,
  });

  useEffect(() => {
    if (croppedAvatar) {
      setError(null);
    }
  }, [croppedAvatar]);

  const onSubmit = (data: CompanySchemaType) => {
    if (!croppedAvatar) {
      setError("Please upload a logo for your company");
      return;
    }
    const companyLogo = croppedAvatar
      ? new File([croppedAvatar], `logo_avatar_${data.name}.webp`)
      : undefined;
    setLoading(true);
    execute({
      name: data.name,
      description: data.description,
      websiteURl: data.websiteURl,
      logo: companyLogo,
    });
  };
  useEffect(() => {
    if (status === "idle") return;
    if (!loading) {
      setOpen(false);
      setCroppedAvatar(null);
    }
  }, [loading, status]);
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
          <Label>Logo</Label>
          <AvatarInput
            src={
              croppedAvatar
                ? URL.createObjectURL(croppedAvatar)
                : "/avatar-placeholder.png"
            }
            onImageCropped={setCroppedAvatar}
          />
          {error && <p className="text-destructive text-sm">{error}</p>}
        </div>
        {form.formState.errors.logo && (
          <p className="text-destructive text-sm">
            {form.formState.errors.logo.message}
          </p>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      {...field}
                      placeholder="Enter Company Name"
                    />
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
                      disabled={loading}
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
                    <Input
                      disabled={loading}
                      {...field}
                      placeholder="Company Website URL"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ResponsiveModalFooter>
              <LoadingButton type="submit" loading={loading}>
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
