import AvatarInput from "@/components/Global/AvatarInput";
import CardWrapper from "@/components/Global/CardWrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
import { JobSeekerOnboardingFormProps } from "@/lib/types";
import {
  personalInfoSchema,
  PersonalInfoSchema,
} from "@/schema/JobSeekerOnboardingSchema";
import { getClientSession } from "@/store/getClientSession";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
const PersonalInfoForm = ({
  jobSeekerFormData,
  setJobSeekerFormData,
}: JobSeekerOnboardingFormProps) => {
  const { session, status } = getClientSession();

  const [croppedAvatar, setCroppedAvatar] = useState<Blob | null>(null);
  const form = useForm<PersonalInfoSchema>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: jobSeekerFormData.fullName || "",
      phoneNumber: jobSeekerFormData.phoneNumber || "",
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      // update data
      setJobSeekerFormData({ ...jobSeekerFormData, ...values });
      console.log(jobSeekerFormData);
    });
    return unsubscribe;
  }, [form, jobSeekerFormData, setJobSeekerFormData]);

  return (
    <div className="flex items-center justify-center h-full">
      <CardWrapper
        classname=" w-[350px] md:w-[450px] xl:w-[600px]"
        headerLabel="Personal Info"
        secondaryHeaderLabel="Tell Us About yourself"
      >
        <div className="space-y-3 mb-6">
          <Label>Profile Picture</Label>
          <AvatarInput
            src={
              croppedAvatar
                ? URL.createObjectURL(croppedAvatar)
                : session?.user.avatarUrl || "/avatar-placeholder.png"
            }
            onImageCropped={setCroppedAvatar}
          />
        </div>
        <Form {...form}>
          <form className="space-y-8 mb-8">
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
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <PhoneInput
                      placeholder="Your Phone Number"
                      defaultCountry="NP"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};
export default PersonalInfoForm;
