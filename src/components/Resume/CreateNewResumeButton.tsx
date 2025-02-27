"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { PlusCircle, FileText, UserCircle } from "lucide-react";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "../ui/responsive-dailog";

const CreateNewResumeButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} className="flex items-center gap-2">
        <PlusCircle className="h-4 w-4" />
        Create New Resume
      </Button>

      <ResponsiveModal open={open} onOpenChange={setOpen}>
        <ResponsiveModalContent>
          <ResponsiveModalHeader>
            <ResponsiveModalTitle className="text-xl font-semibold">
              Create New Resume
            </ResponsiveModalTitle>
            <ResponsiveModalDescription className="text-muted-foreground">
              Choose how you'd like to create your resume
            </ResponsiveModalDescription>
          </ResponsiveModalHeader>

          <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2">
            <Card className="border border-border hover:border-primary hover:shadow-md transition-all cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">
                  Start Fresh
                </CardTitle>
                <CardDescription>
                  Create a brand new resume from scratch
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileText className="h-12 w-12 text-primary mx-auto my-2" />
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full" variant="default">
                  <Link href={"/job-seeker/resume-editor"}>Create New</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="border border-border hover:border-primary hover:shadow-md transition-all cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">
                  Use Profile Data
                </CardTitle>
                <CardDescription>
                  Import data from your existing profile
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UserCircle className="h-12 w-12 text-primary mx-auto my-2" />
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild variant="default">
                  <Link href={"/job-seeker/resume-editor?profileData=true"}>
                    Import Profile Data
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <ResponsiveModalFooter className="sm:justify-start">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </ResponsiveModalFooter>
        </ResponsiveModalContent>
      </ResponsiveModal>
    </>
  );
};

export default CreateNewResumeButton;
