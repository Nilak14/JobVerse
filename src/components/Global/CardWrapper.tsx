"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel?: string;
  backButtonHref?: string;
  showFooter?: boolean;
}
const CardWrapper = ({
  backButtonHref,
  backButtonLabel,
  children,
  headerLabel,
  showFooter,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md bg-black">
      <CardHeader>
        <div className="w-full flex flex-col items-center justify-center gap-y-4">
          <h1 className="font-semibold">{headerLabel}</h1>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showFooter && (
        <CardFooter>
          <Button
            variant={"link"}
            size={"sm"}
            className="font-normal w-full text-white"
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
