import { auth as authJs } from "@/auth";
import prisma from "@/lib/prisma";
import { cache } from "react";

export const auth = cache(async () => {
  const session = await authJs();
  if (!session || !session.user) return null;

  if (session.user.type === "ADMIN") {
    const admin = await prisma.admin.findUnique({
      where: { userId: session.user.id },
      select: { id: true },
    });
    return { ...session, adminId: admin?.id || null };
  }
  if (session.user.type === "EMPLOYER") {
    const employer = await prisma.employer.findFirst({
      where: { userId: session.user.id },
      select: { activeCompanyId: true, id: true },
    });

    return {
      ...session,
      activeCompanyId: employer?.activeCompanyId || null,
      employerId: employer?.id || null,
    };
  }

  return session;
});

//! after updating the auth function, update the useClientSession hook also. (use-session folder)
