"use client";

import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  className?: string;
  href?: string;
  text?: string;
}
const BackButton = ({ className, href, text = "Back" }: BackButtonProps) => {
  const router = useRouter();
  return (
    <Button
      asChild
      size={"sm"}
      variant={"secondary"}
      className={cn("group cursor-pointer ", className)}
      onClick={() => {
        if (href) return;
        router.back();
      }}
    >
      {href ? (
        <Link href={href}>
          <ChevronLeft className="group-hover:-translate-x-1 transition-transform  duration-200 ease-in-out" />
          {text}
        </Link>
      ) : (
        <div>
          <ChevronLeft className="group-hover:-translate-x-1 transition-transform  duration-200 ease-in-out" />
          {text}
        </div>
      )}
    </Button>
  );
};
export default BackButton;
