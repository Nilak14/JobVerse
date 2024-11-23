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
import { PhoneInput } from "@/components/ui/phone-input";
import { JobSeekerOnboardingFormProps } from "@/lib/types";
import {
  personalInfoSchema,
  PersonalInfoSchema,
} from "@/schema/JobSeekerOnboardingSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
const PersonalInfoForm = ({
  jobSeekerFormData,
  setJobSeekerFormData,
}: JobSeekerOnboardingFormProps) => {
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
        <Form {...form}>
          <form className="space-y-8 mb-8">
            <FormField
              control={form.control}
              name="photo"
              render={({ field: { value, ...fieldValue } }) => (
                <FormItem>
                  <FormLabel>Profile Photo</FormLabel>
                  <FormControl>
                    <Input
                      {...fieldValue}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        fieldValue.onChange(file);
                      }}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
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
