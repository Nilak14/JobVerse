"use client";

import { UserPlus } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import InviteMemberModal from "./InviteMemberModal";

const InviteNewMemberButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <UserPlus />
        Invite New Members
      </Button>
      <InviteMemberModal open={open} setOpen={setOpen} />
    </>
  );
};
export default InviteNewMemberButton;
