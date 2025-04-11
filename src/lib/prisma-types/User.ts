import { Prisma } from "@prisma/client";

export function getAllUsers() {
  return {
    JOB_SEEKER: true,
    EMPLOYER: true,
    Admin: true,
    subscriptions: true,
  } satisfies Prisma.UserInclude;
}

export type AllUsers = Prisma.UserGetPayload<{
  include: ReturnType<typeof getAllUsers>;
}>;
