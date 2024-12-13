import { auth as authJs } from "@/auth";
import prisma from "@/lib/prisma";

export const auth = async () => {
  const session = await authJs();
  if (!session || !session.user) return null;
  if (session.user.type !== "EMPLOYER") return session;

  // Fetch activeCompanyId for the employer
  const employer = await prisma.employer.findFirst({
    where: { userId: session.user.id },
    select: { activeCompanyId: true },
  });

  return {
    ...session,
    activeCompanyId: employer?.activeCompanyId || null,
  };
};
