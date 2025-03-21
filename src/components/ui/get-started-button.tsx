"use client";
import { RainbowButton } from "./rainbow-button";
import { ArrowRightIcon } from "lucide-react";

import { useState } from "react";
import RegisterModel from "../RegisterModel";
const GetStartedButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <RainbowButton
        onClick={() => setOpen(!open)}
        className="dark:text-black group text-white p-5 flex gap-2 hover:ring-4 ring-primary -ring-offset-8 whitespace-nowrap "
      >
        Start For Free{" "}
        <ArrowRightIcon className="group-hover:translate-x-1 transition-transform duration-200 ease-in-out" />
      </RainbowButton>
      <RegisterModel open={open} setOpen={setOpen} />
    </>
  );
};
export default GetStartedButton;
