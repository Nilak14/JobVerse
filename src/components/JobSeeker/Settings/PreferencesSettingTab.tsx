"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import type { JobSeekerProfileComponentProps } from "@/lib/types";
import {
  PreferencesSettingsSchema,
  type PreferencesSettingsSchemaSchemaType,
} from "@/schema/JobSeekerSettingSchema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, MapPin, Megaphone, Star } from "lucide-react";
import { useForm } from "react-hook-form";
import { preferencesSetting } from "@/actions/settings/preferencesSettings";
import { toast } from "sonner";
import { useState } from "react";
import BlockLoader from "@/components/ui/block-loader";
import LoadingButton from "@/components/ui/loading-button";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
const PreferencesSettingTab = ({ profile }: JobSeekerProfileComponentProps) => {
  let nearByJobRadius = Number(
    profile.JOB_SEEKER?.JobSeekerProfile?.nearByJobRadius
  );
  if (isNaN(nearByJobRadius)) {
    nearByJobRadius = 25;
  }
  const form = useForm<PreferencesSettingsSchemaSchemaType>({
    defaultValues: {
      applicationUpdates:
        profile.JOB_SEEKER?.JobSeekerProfile?.receiveJobApplicationUpdated ??
        true,
      jobRecommendationEmails:
        profile.JOB_SEEKER?.JobSeekerProfile?.receiveJobRecommendationEmail ??
        true,
      marketingEmails:
        profile.JOB_SEEKER?.JobSeekerProfile?.receiveMarketingEmails ?? true,
      nearByJobRadius: nearByJobRadius,
      showNearByJob:
        profile.JOB_SEEKER?.JobSeekerProfile?.showNearByJobs ?? true,
    },
    mode: "onChange",
    resolver: zodResolver(PreferencesSettingsSchema),
  });
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data: PreferencesSettingsSchemaSchemaType) => {
    setLoading(true);
    try {
      const res = await preferencesSetting(data);
      if (res.success) {
        toast.success(res.message, { id: "preferences-setting" });
      } else {
        toast.error(res.message, { id: "preferences-setting" });
      }
    } catch (error) {
      toast.error("Failed to update preferences", {
        id: "preferences-setting",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="relative">
      <BlockLoader isLoading={loading} textContent="Updating" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <CardContent>
            <div className="space-y-3 mb-4 mt-4">
              <div>
                <h3 className="font-bold">Notification Preferences</h3>
                <p className="text-sm text-muted-foreground">
                  Manage how and when JobVerse notifies you
                </p>
              </div>

              <div>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="jobRecommendationEmails"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 hover:border-primary/50 transition-colors duration-300">
                        <div className="space-y-0.5 flex items-center gap-5">
                          <Star className="hidden md:block" />
                          <div>
                            <FormLabel className="text-base ">
                              Job Recommendation Emails
                            </FormLabel>
                            <FormDescription>
                              Receive personalized job recommendations in your
                              email
                            </FormDescription>
                          </div>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="applicationUpdates"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 hover:border-primary/50 transition-colors duration-300">
                        <div className="space-y-0.5 flex items-center gap-5">
                          <FileText className="hidden md:block" />
                          <div>
                            <FormLabel className="text-base ">
                              Application Updates
                            </FormLabel>
                            <FormDescription>
                              Get updates on your job applications in your email
                            </FormDescription>
                          </div>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="marketingEmails"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 hover:border-primary/50 transition-colors duration-300">
                        <div className="space-y-0.5 flex items-center gap-5">
                          <Megaphone className="hidden md:block" />
                          <div>
                            <FormLabel className="text-base ">
                              Marketing Emails
                            </FormLabel>
                            <FormDescription>
                              Promotional content and special offers
                            </FormDescription>
                          </div>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-3 mb-4 mt-4">
              <h3 className="font-bold">Job Preferences</h3>

              <FormField
                control={form.control}
                name="showNearByJob"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 hover:border-primary/50 transition-colors duration-300">
                    <div className="space-y-0.5 flex items-center gap-5">
                      <MapPin className="hidden md:block" />
                      <div>
                        <FormLabel className="text-base">Nearby Jobs</FormLabel>
                        <FormDescription>
                          Show job recommendations near your location
                        </FormDescription>
                      </div>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nearByJobRadius"
                render={({ field: { value, onChange } }) => {
                  const isDisabled = !form.watch("showNearByJob");
                  return (
                    <FormItem
                      className={`flex flex-col rounded-lg border p-4 hover:border-primary/50 transition-colors duration-300 ${isDisabled ? "opacity-60" : ""}`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div className="space-y-0.5 flex items-center gap-5">
                          <div className="w-6 h-6 flex items-center justify-center">
                            <span className="text-xs font-medium">{value}</span>
                          </div>
                          <div>
                            <FormLabel className="text-base">
                              Job Radius: {value} km
                            </FormLabel>
                            <FormDescription>
                              Set the distance for nearby job recommendations
                            </FormDescription>
                          </div>
                        </div>
                      </div>
                      <FormControl>
                        <Slider
                          min={0}
                          max={200}
                          step={5}
                          value={[value]}
                          onValueChange={(vals) => {
                            if (!isDisabled) {
                              onChange(vals[0]);
                            }
                          }}
                          className={`w-full ${isDisabled ? "cursor-not-allowed" : ""}`}
                          disabled={isDisabled}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
          </CardContent>
          <CardFooter>
            <div className="w-full  flex justify-end gap-4 ">
              <LoadingButton loading={loading} type="submit">
                Save Changes
              </LoadingButton>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
export default PreferencesSettingTab;
