import Link from "next/link";
import DelayContainer from "../Global/DelayContainer";
import { Logo } from "./NavBar";
import Container from "../Global/Container";
import { ThemeToggler } from "../Global/SmallThemeToggler";

const Footer = () => {
  return (
    <Container>
      <footer className="flex flex-col relative items-center justify-center border-t border-border pt-16 pb-8 md:pb-0 px-6 lg:px-8 w-full  mx-auto lg:pt-32 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)]">
        <div className="absolute top-0 left-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-1.5 bg-foreground rounded-full"></div>

        <div className="grid gap-8 xl:grid-cols-3 xl:gap-8 w-full">
          <DelayContainer delay={0.1}>
            <div className="flex flex-col items-start justify-start md:max-w-[200px]">
              <div className="flex items-start">
                <Logo height="50" width="50" fill="#e9590c" showText={false} />
              </div>
              <p className="text-muted-foreground mt-4 text-sm text-start">
                Find,Apply & Succeed
              </p>
              <span className="mt-4 text-black dark:text-neutral-200 text-sm flex items-center">
                Made by{" "}
                <Link
                  target="_blank"
                  href="https://github.com/Nilak14"
                  className="font-semibold ml-1"
                >
                  Nilak
                </Link>
              </span>
            </div>
          </DelayContainer>

          <div className="grid-cols-2 gap-8 grid mt-16 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <DelayContainer delay={0.2}>
                <div className="">
                  <h3 className="text-base font-medium text-black dark:text-white">
                    Product
                  </h3>
                  <ul className="mt-4 text-sm text-muted-foreground">
                    <li className="mt-2">
                      <Link
                        href="#features"
                        className="hover:text-foreground transition-all duration-300"
                      >
                        Features
                      </Link>
                    </li>
                    <li className="mt-2">
                      <Link
                        href="#pricing"
                        className="hover:text-foreground transition-all duration-300"
                      >
                        Pricing
                      </Link>
                    </li>
                    <li className="mt-2">
                      <Link
                        href=""
                        className="hover:text-foreground transition-all duration-300"
                      >
                        Testimonials
                      </Link>
                    </li>
                    <li className="mt-2">
                      <Link
                        href=""
                        className="hover:text-foreground transition-all duration-300"
                      >
                        Integration
                      </Link>
                    </li>
                  </ul>
                </div>
              </DelayContainer>
              <DelayContainer delay={0.3}>
                <div className="mt-10 md:mt-0 flex flex-col">
                  <h3 className="text-base font-medium text-black dark:text-white">
                    Social Links
                  </h3>
                  <ul className="mt-4 text-sm text-muted-foreground">
                    <li className="">
                      <Link
                        href="https://www.facebook.com/nilak.pathak.545/"
                        className="hover:text-foreground transition-all duration-300"
                      >
                        Facebook
                      </Link>
                    </li>
                    <li className="mt-2">
                      <Link
                        href="https://www.instagram.com/nee_lock/"
                        className="hover:text-foreground transition-all duration-300"
                      >
                        Instagram
                      </Link>
                    </li>
                    <li className="mt-2">
                      <Link
                        href="https://github.com/Nilak14"
                        className="hover:text-foreground transition-all duration-300"
                      >
                        Github
                      </Link>
                    </li>
                    <li className="mt-2">
                      <Link
                        href="https://www.linkedin.com/in/nilak-pathak-14ot/"
                        className="hover:text-foreground transition-all duration-300"
                      >
                        LinkedIn
                      </Link>
                    </li>
                  </ul>
                </div>
              </DelayContainer>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <DelayContainer delay={0.4}>
                <div className="">
                  <h3 className="text-base font-medium text-black dark:text-white">
                    Join Now
                  </h3>
                  <ul className="mt-4 text-sm text-muted-foreground">
                    <li className="mt-2">
                      <Link
                        href="/register/job_seeker"
                        className="hover:text-foreground transition-all duration-300"
                      >
                        Job Seeker
                      </Link>
                    </li>
                    <li className="mt-2">
                      <Link
                        href="/register/employer"
                        className="hover:text-foreground transition-all duration-300"
                      >
                        Employer
                      </Link>
                    </li>
                  </ul>
                </div>
              </DelayContainer>
              <DelayContainer delay={0.5}>
                <div className="mt-10 md:mt-0 flex flex-col">
                  <h3 className="text-base font-medium text-black dark:text-white">
                    Company
                  </h3>
                  <ul className="mt-4 text-sm text-muted-foreground">
                    <li className="">
                      <Link
                        href=""
                        className="hover:text-foreground transition-all duration-300"
                      >
                        About Us
                      </Link>
                    </li>
                    <li className="mt-2">
                      <Link
                        href="/privacy"
                        className="hover:text-foreground transition-all duration-300"
                      >
                        Privacy Policy
                      </Link>
                    </li>
                    <li className="mt-2">
                      <Link
                        href="/terms"
                        className="hover:text-foreground transition-all duration-300"
                      >
                        Terms & Conditions
                      </Link>
                    </li>
                  </ul>
                </div>
              </DelayContainer>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border/40 pt-4 md:pt-8 md:flex md:items-center md:justify-between w-full">
          <DelayContainer
            delay={0.6}
            className="flex items-center justify-between"
          >
            <p className="text-sm text-muted-foreground mt-8 md:mt-0">
              &copy; {new Date().getFullYear()} JobVerse. All rights reserved.
            </p>
            <div>
              <ThemeToggler />
            </div>
          </DelayContainer>
        </div>
      </footer>
    </Container>
  );
};

export default Footer;
