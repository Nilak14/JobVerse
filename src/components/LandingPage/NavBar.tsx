"use client";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

import { ArrowRightIcon, MenuIcon } from "lucide-react";

import Container from "../Global/Container";
import { JobVerseLogo } from "../../../public/logo/jobverse";
import { NavLinks } from "@/lib/data";
import AnimateWrapper from "../Global/AnimateWrapper";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { RainbowButton } from "../ui/rainbow-button";

export const NavBar = () => {
  const [scroll, setScroll] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 8) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header
      className={cn(
        "sticky  top-0 inset-x-0 h-20 w-full  select-none",
        scroll && "border-background/80 bg-background/40 backdrop-blur-md   "
      )}
    >
      <AnimateWrapper reverse>
        <Container className="flex items-center justify-between lg:justify-normal gap-14  px-7 md:px-10 lg:px-14 ">
          <NavLogo width="35" height="35" />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="top">
              <SheetTitle>
                <NavLogo />
              </SheetTitle>

              <div className="grid gap-2 py-6">
                {NavLinks.map((link) => (
                  <Link
                    href={link.href}
                    key={link.name}
                    className="flex w-full items-center py-2 text-lg font-semibold"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <AuthButtons />
            </SheetContent>
          </Sheet>

          <div className=" w-full hidden md:flex md:justify-between ">
            <NavigationMenu className="">
              <NavigationMenuList>
                {NavLinks.map((link) => (
                  <NavigationMenuLink key={link.name} asChild>
                    <Link
                      href={link.href}
                      className="group inline-flex h-9 w-max items-center justify-center rounded-md  px-4 py-2 text-muted-foreground hover:text-primary-foreground hover:bg-primary-background transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </NavigationMenuLink>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            <AuthButtons />
          </div>
        </Container>
      </AnimateWrapper>
    </header>
  );
};
export default NavBar;

export function NavLogo({
  width = "20",
  height = "20",
  fill = "white",
}: {
  width?: string;
  height?: string;
  fill?: string;
}) {
  return (
    <Link href="#" className="flex items-center gap-2 " prefetch={false}>
      <JobVerseLogo width={width + "px"} height={height + "px"} fill={fill} />
      <span className=" text-xl tracking-wide">JobVerse</span>
    </Link>
  );
}

export function AuthButtons({ className }: { className?: string }) {
  return (
    <div className={cn("flex gap-8 items-center", className)}>
      <Button>Log In</Button>
      <RainbowButton className="text-black flex gap-2 p-5">
        Start for Free <ArrowRightIcon />
      </RainbowButton>
    </div>
  );
}
