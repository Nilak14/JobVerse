"use client";
import AvatarInput from "@/components/Global/AvatarInput";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  personalInfoSchema,
  PersonalInfoSchema,
} from "@/schema/JobSeekerOnboardingSchema";
import { getClientSession } from "@/store/getClientSession";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import OnboardingFormWrapper, {
  InputWrapper,
} from "@/components/onboarding/OnboardingFormWrapper";
import { Button } from "@/components/ui/button";
import { getJobSeekerOnboardingFormStatus } from "@/store/getJobSeekerOnboardingFormStatus";
const PersonalInfoForm = ({
  setCurrentStep,
}: {
  setCurrentStep: (step: string) => void;
}) => {
  const { session, status } = getClientSession();
  const { formData, setFormData, initializeFormData } =
    getJobSeekerOnboardingFormStatus();
  const [croppedAvatar, setCroppedAvatar] = useState<Blob | null>(null);

  const form = useForm<PersonalInfoSchema>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: formData.fullName || session?.user.name || "",
      phoneNumber: formData.phoneNumber || "",
      dob: formData.dob || "",
      gender: formData.gender || undefined,
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (status === "authenticated" && !form.getValues("fullName")) {
      form.setValue("fullName", session?.user.name || "");
    } else {
      form.setValue("fullName", formData.fullName);
    }
    form.setValue("phoneNumber", formData.phoneNumber);
    form.setValue("dob", formData.dob);
    form.setValue("gender", formData.gender);
  }, [status, formData]);

  const goToNextStep = (values: PersonalInfoSchema) => {
    setFormData(values);
    setCurrentStep("educational-background");
  };
  useEffect(() => {
    initializeFormData();
  }, []);

  return (
    <div className="flex items-center justify-center h-full">
      <OnboardingFormWrapper
        headerLabel="Personal Information"
        secondaryHeaderLabel="Fill Out Your Primary Information"
      >
        <div className="space-y-3 mb-6 flex items-center gap-5 ">
          <AvatarInput
            size="size-20"
            src={
              croppedAvatar
                ? URL.createObjectURL(croppedAvatar)
                : session?.user.avatarUrl || "/avatar-placeholder.png"
            }
            onImageCropped={setCroppedAvatar}
          />
          <Label className="text-primary">Upload Profile Picture</Label>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(goToNextStep)}
            className="space-y-8 mb-8"
          >
            <InputWrapper>
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
            </InputWrapper>
            <InputWrapper>
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="others">Others</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth (A.D)</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full block"
                        placeholder="Your Date of Birth"
                        max={new Date().toISOString().split("T")[0]}
                        {...field}
                        value={field.value}
                        type="date"
                      />
                    </FormControl>
                    <FormDescription>You can't change it later</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </InputWrapper>
            <div className="flex flex-col">
              <Button className="self-end">Next Step</Button>
            </div>
          </form>
        </Form>
      </OnboardingFormWrapper>
    </div>
  );
};
export default PersonalInfoForm;
