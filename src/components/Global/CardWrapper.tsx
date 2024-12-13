"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { cn } from "@/lib/utils";

interface CardWrapperProps {
  children: React.ReactNode;
  classname?: string;
  headerLabel?: string;
  secondaryHeaderLabel?: string;
  backButtonLabel?: string;
  backButtonHref?: string;
  showFooter?: boolean;
}
const CardWrapper = ({
  backButtonHref,
  classname,
  backButtonLabel,
  secondaryHeaderLabel,
  children,
  headerLabel,
  showFooter,
}: CardWrapperProps) => {
  return (
    <Card
      className={cn("w-[400px] shadow-md bg-white dark:bg-black", classname)}
    >
      <CardHeader>
        <div className="w-full flex flex-col items-center justify-center gap-y-4">
          <h1 className="font-semibold">{headerLabel}</h1>
          {secondaryHeaderLabel && (
            <p className="text-xs font-semibold tracking-wide text-pretty break-all text-muted-foreground -mt-2 ">
              {secondaryHeaderLabel}
            </p>
          )}
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showFooter && (
        <CardFooter>
          <Button
            variant={"link"}
            size={"sm"}
            className="font-normal w-full dark:text-white text-black"
            asChild
          >
            <Link href={backButtonHref!}>{backButtonLabel!}</Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
export default CardWrapper;
