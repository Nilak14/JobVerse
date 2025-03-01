import { ApplicationStatus } from "@prisma/client";
import { Badge } from "../ui/badge";
import { CheckCircle2, Clock, HourglassIcon, XCircle } from "lucide-react";

const ApplicationStatusBadge = ({ status }: { status: ApplicationStatus }) => {
  switch (status) {
    case "PENDING":
      return (
        <Badge variant="outline" className="bg-muted text-muted-foreground">
          <HourglassIcon className="mr-1 h-3 w-3" /> Pending
        </Badge>
      );
    case "INTERVIEW":
      return (
        <Badge
          variant="outline"
          className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
        >
          <Clock className="mr-1 h-3 w-3" /> Interview
        </Badge>
      );
    case "APPROVED":
      return (
        <Badge
          variant="outline"
          className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
        >
          <CheckCircle2 className="mr-1 h-3 w-3" /> Offer
        </Badge>
      );
    case "REJECTED":
      return (
        <Badge
          variant="outline"
          className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
        >
          <XCircle className="mr-1 h-3 w-3" /> Rejected
        </Badge>
      );
    default:
      return <Badge>{status}</Badge>;
  }
};
export default ApplicationStatusBadge;
