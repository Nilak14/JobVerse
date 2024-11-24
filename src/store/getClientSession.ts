import { Session } from "next-auth";
import { create } from "zustand";
export interface SessionStore {
  session: Session | null;
  setSession: (session: Session | null) => void;
  status: "unauthenticated" | "loading" | "authenticated";
  setStatus: (status: "unauthenticated" | "loading" | "authenticated") => void;
}
export const getClientSession = create<SessionStore>((set) => ({
  session: null,
  setSession: (session) => set({ session }),
  status: "unauthenticated",
  setStatus: (status) => set({ status }),
}));
