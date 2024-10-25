"use client";

import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  className?: string;
}
const BackButton = ({ className }: BackButtonProps) => {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.back()}
      variant={"secondary"}
      className={cn(className)}
    >
      <ChevronLeft />
      Back
    </Button>
  );
};
export default BackButton;
