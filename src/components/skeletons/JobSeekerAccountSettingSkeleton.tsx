import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Briefcase, Settings2, Shield, User } from "lucide-react";
import AccountSecuritySkeleton from "./AccountSecuritySkeleton";

const AccountSettingContentShimmer = () => {
  return (
    <section>
      <div className="flex items-center gap-6 sm:gap-10">
        {/* Avatar Shimmer */}
        <Skeleton className="w-24 h-24 rounded-full" />

        <div className="space-y-4">
          {/* Name Shimmer */}
          <Skeleton className="h-8 w-40" />

          {/* Location and Badge Shimmer */}
          <div className="flex flex-wrap gap-x-10 gap-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-24" />
          </div>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6 mt-8">
        <ScrollArea>
          <div className="w-full relative h-12">
            <TabsList className="flex absolute h-12">
              <TabsTrigger
                value="profile"
                className="flex items-center gap-2 py-2"
              >
                <User className="w-4 h-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger
                className="flex items-center gap-2 py-2"
                value="professional-details"
              >
                <Briefcase className="w-4 h-4" />
                Professional Details
              </TabsTrigger>
              <TabsTrigger
                className="flex items-center gap-2 py-2"
                value="preferences"
              >
                <Settings2 className="w-4 h-4" />
                Preferences
              </TabsTrigger>
              <TabsTrigger
                className="flex items-center gap-2 py-2"
                value="privacy"
              >
                <Shield className="w-4 h-4" />
                Privacy & Security
              </TabsTrigger>
            </TabsList>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <TabsContent value="profile" className="space-y-4">
          {/* Profile Tab Content Shimmer */}
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-32 w-full" />
          </div>
        </TabsContent>

        <TabsContent value="professional-details" className="space-y-4">
          {/* Professional Details Tab Content Shimmer */}
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-2/3" />
          </div>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4">
          {/* Preferences Tab Content Shimmer */}
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-1/2" />
            <Skeleton className="h-12 w-3/4" />
          </div>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-4">
          {/* Privacy Tab Content Shimmer */}
          <AccountSecuritySkeleton />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default AccountSettingContentShimmer;
