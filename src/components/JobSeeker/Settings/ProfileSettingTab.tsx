import { profileSettings } from "@/actions/settings/profileSettings";
import BlockLoader from "@/components/ui/block-loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/loading-button";
import { Textarea } from "@/components/ui/textarea";
import { JobSeekerProfileComponentProps } from "@/lib/types";
import {
  PersonalInformationSchema,
  PersonalInformationSchemaType,
} from "@/schema/JobSeekerSettingSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
const ProfileSettingTab = ({ profile }: JobSeekerProfileComponentProps) => {
  const form = useForm<PersonalInformationSchemaType>({
    defaultValues: {
      address: profile.JOB_SEEKER?.JobSeekerProfile?.location || "",
      designation: profile.JOB_SEEKER?.JobSeekerProfile?.designation || "",
      bio: profile.JOB_SEEKER?.JobSeekerProfile?.bio || "",
      fullName: profile.name || "",
      openToWork: profile.JOB_SEEKER?.JobSeekerProfile?.openToWork || true,
    },
    mode: "onChange",
    resolver: zodResolver(PersonalInformationSchema),
  });
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data: PersonalInformationSchemaType) => {
    setLoading(true);
    try {
      const res = await profileSettings(data);
      if (res.success) {
        toast.success(res.message, { id: "personal-information" });
      } else {
        toast.error(res.message, { id: "personal-information" });
      }
    } catch (error) {
      toast.error("Failed to update personal information", {
        id: "personal-information",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="relative">
      <BlockLoader isLoading={loading} textContent="Updating" />
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          Update your personal details and contact information
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Full Name" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Address" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              <FormField
                control={form.control}
                name="designation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Designation</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Your Current Job Title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Professional Summary</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none min-h-28"
                      placeholder="Enter your Professional Details"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="openToWork"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 cursor-pointer">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="cursor-pointer">
                      Open To Work?
                    </FormLabel>
                    <FormDescription className="pt-1">
                      Selecting this will add an urgent tag to the job post
                    </FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <div className="w-full  flex justify-end gap-4 ">
              <Button type="button" variant={"secondary"}>
                Cancel
              </Button>
              <LoadingButton loading={loading} showIconOnly type="submit">
                Save Changes
              </LoadingButton>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
export default ProfileSettingTab;
