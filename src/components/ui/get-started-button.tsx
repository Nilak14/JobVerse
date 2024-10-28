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
        className="dark:text-black text-white p-5 flex gap-2 "
      >
        Start For Free <ArrowRightIcon />
      </RainbowButton>
      <RegisterModel open={open} setOpen={setOpen} />
    </>
  );
};
export default GetStartedButton;
