"use client";

import UserProfileInput from "@/components/Global/UserProfileInput";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, Settings2, Shield, User } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ProfileSettingTab from "./ProfileSettingTab";
import ProfessionalDetailsTab from "./ProfessionalDetailsTab";
import PreferencesSettingTab from "./PreferencesSettingTab";
import PrivacySettingTab from "./PrivacySettingTab";
import { useSearchParams } from "next/navigation";
import { JobSeekerProfile } from "@/lib/prisma-types/JobSeekerProfile";

interface AccountSettingContentProps {
  profile: JobSeekerProfile;
}

const AccountSettingContent = ({ profile }: AccountSettingContentProps) => {
  const searchParams = useSearchParams();
  const [croppedAvatar, setCroppedAvatar] = useState<Blob | null>(null);
  return (
    <section className="">
      <div className="flex items-center gap-6 sm:gap-10  ">
        <UserProfileInput
          username="Nilak Pathak"
          size="size-24"
          src={
            croppedAvatar ? URL.createObjectURL(croppedAvatar) : profile.image
          }
          onImageCropped={setCroppedAvatar}
        />
        <div>
          <div>
            <h1 className="text-base sm:text-2xl font-bold mb-1">
              {profile.name}
              {profile.JOB_SEEKER?.JobSeekerProfile?.designation && (
                <span>
                  ({profile.JOB_SEEKER?.JobSeekerProfile?.designation})
                </span>
              )}
            </h1>
            <p className="text-xs font-semibold text-muted-foreground mb-2">
              {profile.email}
            </p>
          </div>
          <div className="flex flex-wrap gap-x-10 gap-y-2 ">
            {profile.JOB_SEEKER?.JobSeekerProfile?.location && (
              <p className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin size={20} />
                <span>{profile.JOB_SEEKER?.JobSeekerProfile?.location}</span>
              </p>
            )}
            <Badge className="bg-primary/20 text-primary hover:bg-primary/10  py-2">
              Open To Work
            </Badge>
          </div>
        </div>
      </div>

      <Tabs
        onValueChange={(e) => {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set("tab", e);
          window.history.replaceState(
            null,
            "",
            `?${newSearchParams.toString()}`
          );
        }}
        value={searchParams.get("tab") || "profile"}
        defaultValue="profile"
        className="space-y-6 mt-8"
      >
        <ScrollArea>
          <div className="w-full relative h-12">
            <TabsList className="flex absolute h-12">
              <TabsTrigger
                value="profile"
                className="flex items-center gap-2 py-2 "
              >
                <User className="w-4 h-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger
                className="flex items-center gap-2 py-2 "
                value="professional-details"
              >
                <Briefcase className="w-4 h-4" />
                Professional Details
              </TabsTrigger>
              <TabsTrigger
                className="flex items-center gap-2 py-2 "
                value="preferences"
              >
                <Settings2 className="w-4 h-4" />
                Preferences
              </TabsTrigger>
              <TabsTrigger
                className="flex items-center gap-2 py-2 "
                value="privacy"
              >
                <Shield className="w-4 h-4" />
                Privacy & Security
              </TabsTrigger>
            </TabsList>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <TabsContent value="profile">
          <div className="animate-fade-left">
            <ProfileSettingTab profile={profile} />
          </div>
        </TabsContent>
        <TabsContent value="professional-details">
          <div className="animate-fade-left">
            <ProfessionalDetailsTab profile={profile} />
          </div>
        </TabsContent>
        <TabsContent value="preferences">
          <div className="animate-fade-left">
            <PreferencesSettingTab profile={profile} />
          </div>
        </TabsContent>
        <TabsContent value="privacy">
          <div className="animate-fade-left">
            <PrivacySettingTab profile={profile} />
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};
export default AccountSettingContent;
