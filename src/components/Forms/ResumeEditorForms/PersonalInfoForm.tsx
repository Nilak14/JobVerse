import {
  personalInfoSchema,
  PersonalInfoValues,
} from "@/schema/ResumeEditorSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ResumeEditorFormShell from "./ResumeEditorFormShell";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useRef } from "react";
import { ResumeEditorFormProps } from "@/lib/types";
import { Button } from "@/components/ui/button";

const PersonalInfoForm = ({
  resumeData,
  setResumeData,
}: ResumeEditorFormProps) => {
  const form = useForm<PersonalInfoValues>({
    defaultValues: {
      city: resumeData.city || "",
      country: resumeData.country || "",
      email: resumeData.email || "",
      fullName: resumeData.fullName || "",
      phone: resumeData.phone || "",
      jobTitle: resumeData.jobTitle || "",
    },
    resolver: zodResolver(personalInfoSchema),
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({ ...resumeData, ...values });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);
  const photoInputRef = useRef<HTMLInputElement>(null);
  return (
    <ResumeEditorFormShell
      title="Personal Info"
      description="Tell us about yourself"
    >
      <Form {...form}>
        <form className="space-y-3">
          <FormField
            control={form.control}
            name="photo"
            render={({ field: { value, ...fieldValue } }) => (
              <FormItem>
                <FormLabel>Your Photo</FormLabel>
                <div className="flex items-center gap-2">
                  <FormControl>
                    <Input
                      {...fieldValue}
                      accept="image/*"
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        fieldValue.onChange(file);
                      }}
                      ref={photoInputRef}
                    />
                  </FormControl>
                  <Button
                    onClick={() => {
                      fieldValue.onChange(null);
                      if (photoInputRef.current) {
                        photoInputRef.current.value = "";
                      }
                    }}
                    type="button"
                    variant={"secondary"}
                  >
                    Remove
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Full Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Job Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> City</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your City Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Country Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Enter Your Phone Number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Your Your Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </ResumeEditorFormShell>
  );
};
export default PersonalInfoForm;
