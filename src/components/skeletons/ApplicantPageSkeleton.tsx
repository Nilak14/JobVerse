import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApplicantGridSkeleton } from "./ApplicantGridViewSkeleton";
import { ApplicantListSkeleton } from "./ApplicantListViewSkeleton";

export function DashboardSkeleton() {
  return (
    <Tabs defaultValue="grid" className="mt-6">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>
        <div className="text-sm text-muted-foreground">
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      <TabsContent value="grid" className="mt-6">
        <ApplicantGridSkeleton />
      </TabsContent>
      <TabsContent value="list" className="mt-6">
        <ApplicantListSkeleton />
      </TabsContent>
    </Tabs>
  );
}
