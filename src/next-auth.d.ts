import { UserType } from "@prisma/client";
import { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  type: UserType;
  avatarUrl: string;
  isBlocked: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
