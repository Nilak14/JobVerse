import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GetRecentUser } from "@/data-access/admin-access/analytics/getRecentUser";
import { Suspense } from "react";
import UserAvatar from "../Global/Useravatar";
import { CalendarDays, Briefcase, User, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

const RecentUser = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest Users</CardTitle>
        <CardDescription>5 Latest Users Registered</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<RecentUserSkeleton />}>
          <RecentUserDataFetcher />
        </Suspense>
      </CardContent>
    </Card>
  );
};

export default RecentUser;

const RecentUserSkeleton = () => {
  return (
    <div className="space-y-4">
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3"
            key={index}
          >
            <div className="h-10 w-10 rounded-full bg-muted animate-pulse shrink-0"></div>
            <div className="space-y-2 flex-1 w-full">
              <div className="h-4 w-24 bg-muted rounded animate-pulse"></div>
              <div className="h-3 w-32 bg-muted rounded animate-pulse"></div>
            </div>
            <div className="flex flex-wrap gap-2 mt-2 sm:mt-0 w-full sm:w-auto">
              <div className="h-6 w-20 bg-muted rounded animate-pulse"></div>
              <div className="h-6 w-24 bg-muted rounded animate-pulse"></div>
            </div>
          </div>
        ))}
    </div>
  );
};

const ErrorDisplay = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <AlertCircle className="h-8 w-8 text-destructive mb-2" />
      <h3 className="font-medium">Failed to load users</h3>
      <p className="text-sm text-muted-foreground mt-1">{message}</p>
    </div>
  );
};

const RecentUserDataFetcher = async () => {
  try {
    const users = await GetRecentUser();

    if (!users || users.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <User className="h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">No users found</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {users.map((user) => (
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 rounded-md hover:bg-muted/50 transition-colors"
            key={user.id}
          >
            <UserAvatar
              imageUrl={user.image || ""}
              userName={user.name || ""}
            />

            <div className="flex flex-col space-y-1 flex-1 min-w-0 w-full sm:w-auto">
              <h3 className="text-sm font-medium truncate">{user.name}</h3>
              <p className="text-xs text-muted-foreground truncate">
                {user.email}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-2 sm:mt-0 w-full sm:w-auto">
              <Badge
                variant={
                  user.userType === "JOB_SEEKER" ? "secondary" : "default"
                }
                className="flex items-center gap-1 h-6"
              >
                <Briefcase className="h-3 w-3" />
                {user.userType === "JOB_SEEKER" ? "Job Seeker" : "Employer"}
              </Badge>

              <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-md h-6">
                <CalendarDays className="h-3 w-3" />
                {format(new Date(user.createdAt), "MMM d, yyyy")}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch recent users:", error);
    return (
      <ErrorDisplay message="There was an error loading the recent users data" />
    );
  }
};
