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

import { MenuIcon } from "lucide-react";

import Container from "../Global/Container";
import { JobVerseLogo } from "../../../public/logo/jobverse";
import { NavLinks } from "@/lib/data";
import AnimateWrapper from "../Global/AnimateWrapper";

import { cn } from "@/lib/utils";
import GetStartedButton from "../ui/get-started-button";

export const NavBar = () => {
  return (
    <header
      className={cn(
        "sticky bg-background/40 backdrop-blur-lg border-b border-border  top-0 inset-x-0 h-16 w-full  select-none z-50"
      )}
    >
      <AnimateWrapper reverse>
        <Container className="flex items-center justify-between lg:justify-normal gap-3 lg:gap-14  px-7 md:px-10 lg:px-24 ">
          <Logo width="35" height="35" fill="#e9590c" />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="top">
              <SheetTitle className="w-fit">
                <Logo width="35" height="35" fill="#e9590c" />
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

          <div className=" w-full hidden lg:flex md:justify-between ">
            <NavigationMenu className="">
              <NavigationMenuList>
                {NavLinks.map((link) => (
                  <NavigationMenuLink key={link.name} asChild>
                    <Link
                      href={link.href}
                      className="group inline-flex h-9 w-max items-center justify-center rounded-md  px-4 py-2 text-muted-foreground 
                      hover:dark:text-primary-foreground hover:text-black
                     hover:bg-primary-background transition-colors duration-200"
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

export function Logo({
  width = "20",
  height = "20",
  fill = "white",
  classname,
  textSize = "text-xl",
}: {
  width?: string;
  height?: string;
  fill?: string;
  classname?: string;
  textSize?: string;
}) {
  return (
    <Link
      href="#"
      className={cn("flex items-center gap-2 ", classname)}
      prefetch={false}
    >
      <JobVerseLogo width={width + "px"} height={height + "px"} fill={fill} />
      <span className={` ${textSize} tracking-wide`}>JobVerse</span>
    </Link>
  );
}

export function AuthButtons({ className }: { className?: string }) {
  return (
    <div className={cn("flex gap-8 items-center", className)}>
      <Button asChild>
        <Link href="/login">Login</Link>
      </Button>
      <GetStartedButton />
    </div>
  );
}
