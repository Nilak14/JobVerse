"use client";

import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  className?: string;
  href?: string;
}
const BackButton = ({ className, href }: BackButtonProps) => {
  const router = useRouter();
  return (
    <Button
      size={"sm"}
      onClick={() => {
        if (href) {
          router.push(href);
        } else {
          router.back();
        }
      }}
      variant={"secondary"}
      className={cn(className)}
    >
      <ChevronLeft />
      Back
    </Button>
  );
};
export default BackButton;
