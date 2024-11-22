"use client";

import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface BackButtonProps {
  className?: string;
  href: string;
}
const BackButton = ({ className, href }: BackButtonProps) => {
  return (
    <Button
      asChild
      size={"sm"}
      variant={"secondary"}
      className={cn("group ", className)}
    >
      <Link href={href}>
        <ChevronLeft className="group-hover:-translate-x-1 transition-transform duration-200 ease-in-out" />
        Back
      </Link>
    </Button>
  );
};
export default BackButton;
