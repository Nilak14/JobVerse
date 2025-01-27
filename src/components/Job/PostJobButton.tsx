"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { BriefcaseMedical } from "lucide-react";
import PostJobTitleInitialModal from "./PostJobTitleInitialModal";

const PostJobButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <BriefcaseMedical />
        Post New Job
      </Button>
      {open && <PostJobTitleInitialModal open={open} setOpen={setOpen} />}
    </>
  );
};
export default PostJobButton;
