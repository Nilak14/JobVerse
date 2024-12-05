"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import NotFoundLOttie from "./Lottie/NotFound";
import Particles from "./ui/particles";

const NotFound = () => {
  return (
    <>
      <Particles
        className="absolute inset-0"
        quantity={500}
        ease={80}
        refresh
      />
      <NotFoundLOttie />
      <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-center">
        Not Found
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-muted-foreground text-center mb-10 mt-5">
        Hey, we have a problem! This part of{" "}
        <span className="text-primary font-semibold tracking-wide animate-bounce inline-block">
          JobVerse
        </span>{" "}
        isn’t hiring. Lets get back to home
      </p>
      <div className="flex items-center justify-center">
        <Button className="" asChild>
          <Link href={"/"}>Back To Home</Link>
        </Button>
      </div>
    </>
  );
};
export default NotFound;
