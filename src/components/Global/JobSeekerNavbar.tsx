import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";

const JobSeekerNavbar = () => {
  return (
    <div className=" w-full hidden lg:flex md:justify-between ">
      <NavigationMenu className="">
        <NavigationMenuList>
          <NavigationMenuLink key={"hi"} asChild>
            <Link
              href={"#"}
              className="group inline-flex h-9 w-max items-center justify-center rounded-md  px-4 py-2 text-muted-foreground 
                      hover:dark:text-primary-foreground hover:text-black
                     hover:bg-primary-background transition-colors duration-200"
            >
              {"Hi"}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};
export default JobSeekerNavbar;
