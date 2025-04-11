import { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Overview from "./tabContent/Overview";
import Jobs from "./tabContent/Jobs";
import Revenue from "./tabContent/Revenue";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard For Admin",
};
const AdminDashboardPage = async () => {
  return (
    <div>
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Overview />
        </TabsContent>
        <TabsContent value="jobs">
          <Jobs />
        </TabsContent>
        <TabsContent value="revenue">
          <Revenue />
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default AdminDashboardPage;
