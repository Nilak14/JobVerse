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
interface CompanyProfileUpdateProps {
  activeCompany: CompanyInclude;
  session: Session;
}
const CompanyProfileUpdate = ({
  activeCompany,
  session,
}: CompanyProfileUpdateProps) => {
  const [croppedAvatar, setCroppedAvatar] = useState<Blob | null>(null);
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
        <CardContent className="py-5">
          <Form {...form}>
            <form className="space-y-5">
              {/* <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5"> */}
              <div className="space-y-2 flex gap-10 items-center w-full">
                <div className="flex items-center gap-10">
                  <AvatarInput
                    src={
                      croppedAvatar
                        ? URL.createObjectURL(croppedAvatar)
                        : activeCompany.logoUrl!
                    }
                    onImageCropped={setCroppedAvatar}
                  />
                </div>
                {error && <p className="text-destructive text-sm">{error}</p>}
                <div className="w-full">
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
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <LoadingButton type="submit" loading={loading}>
            Update Changes
          </LoadingButton>
        </CardFooter>
      </Card>
    </div>
  );
};
export default CompanyProfileUpdate;
