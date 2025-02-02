"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CompanyInclude } from "@/lib/prisma-types/Company";
import { Session } from "next-auth";
import CompanySettingsHeader from "@/components/Company/settings/CompanySettingsHeader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CompanySchema, CompanySchemaType } from "@/schema/CompanySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import AvatarInput from "@/components/Global/AvatarInput";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/loading-button";
import { useForm } from "react-hook-form";
import BlockLoader from "@/components/ui/block-loader";
import useUpdateCompanyAction from "@/hooks/use-actions/useUpdateCompanyAction";
import CustomTipTapEditor from "@/components/tiptap/CustomTipTapEditor";
import CompanyProfilePreview from "./CompanyProfilePreview";
import ContentViewer from "@/components/tiptap/ContentViewer";

interface CompanyProfileUpdateProps {
  activeCompany: CompanyInclude;
  session: Session;
}
const CompanyProfileUpdate = ({
  activeCompany,
  session,
}: CompanyProfileUpdateProps) => {
  const [croppedAvatar, setCroppedAvatar] = useState<Blob | null>(null);

  const [companyAvatar, setCompanyAvatar] = useState<string | null>(
    activeCompany.logoUrl
  );

  const [showDescriptionPreview, setShowDescriptionPreview] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<CompanySchemaType>({
    defaultValues: {
      name: activeCompany.name,
      description: activeCompany.description || "",
      websiteURl: activeCompany.website || "",
      logo: undefined,
    },
    resolver: zodResolver(CompanySchema),
    mode: "onChange",
  });
  useEffect(() => {
    if (croppedAvatar) {
      setError(null);
    }
  }, [croppedAvatar]);

  const { execute, status } = useUpdateCompanyAction({
    setLoading,
    setCompanyAvatar,
  });
  useEffect(() => {
    setCompanyAvatar(activeCompany.logoUrl);
    form.setValue("name", activeCompany.name);
    form.setValue("description", activeCompany.description || "");
    form.setValue("websiteURl", activeCompany.website || "");
  }, [activeCompany]);
  const onSubmit = (data: CompanySchemaType) => {
    if (croppedAvatar) {
      const companyLogo = croppedAvatar
        ? new File([croppedAvatar], `logo_avatar_${data.name}.webp`)
        : undefined;
      execute({
        name: data.name,
        description: data.description,
        websiteURl: data.websiteURl,
        logo: companyLogo,
      });
    } else {
      execute({
        name: data.name,
        description: data.description,
        websiteURl: data.websiteURl,
      });
    }
  };

  useEffect(() => {
    if (croppedAvatar && status === "hasSucceeded" && !loading) {
      setCroppedAvatar(null);
    }
    return;
  }, [status]);

  return (
    <div>
      <CompanySettingsHeader
        title="Company Profile"
        description="Update Your Company Basic Profile"
      />
      <Card className="relative">
        <BlockLoader isLoading={loading} textContent="Updating" />
        <CardHeader className="sr-only">
          <CardTitle>Company Profile</CardTitle>
          <CardDescription>Update Your Company Basic Profile</CardDescription>
        </CardHeader>
        <Form {...form}>
          {error && (
            <p className="text-destructive text-sm text-center mt-3">{error}</p>
          )}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <CardContent className="py-5 space-y-5">
              <div className="space-y-2 flex gap-10 items-center w-full  flex-col sm:flex-row ">
                <div className="flex items-center gap-10 ">
                  <AvatarInput
                    src={
                      croppedAvatar
                        ? URL.createObjectURL(croppedAvatar)
                        : companyAvatar!
                    }
                    onImageCropped={setCroppedAvatar}
                  />
                </div>
                <div className="flex-1 w-full">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input
                            className="w-full"
                            disabled={loading}
                            {...field}
                            placeholder="Enter Company Name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              {form.formState.errors.logo && (
                <p className="text-destructive text-sm">
                  {form.formState.errors.logo.message}
                </p>
              )}
              <div className="space-y-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex justify-between items-center">
                          <FormLabel className="text-lg font-semibold text-muted-foreground">
                            Description
                          </FormLabel>
                          <CompanyProfilePreview
                            showDescriptionPreview={showDescriptionPreview}
                            setShowDescriptionPreview={
                              setShowDescriptionPreview
                            }
                          />
                        </div>
                        <FormControl>
                          <div className="border border-input rounded-md p-4 bg-muted/10 shadow-sm">
                            {showDescriptionPreview ? (
                              <ContentViewer content={field.value} />
                            ) : (
                              <CustomTipTapEditor field={field} />
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="websiteURl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website URL</FormLabel>
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
            </CardContent>
            <CardFooter>
              <LoadingButton
                disabled={
                  (!form.formState.isDirty || !form.formState.isValid) &&
                  croppedAvatar === null
                }
                className="w-full sm:w-auto"
                type="submit"
                loading={loading}
              >
                Update Changes
              </LoadingButton>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};
export default CompanyProfileUpdate;
