/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { getClientSession } from "@/store/getClientSession";
import { getSession } from "next-auth/react";
import { useCallback, useEffect } from "react";

const UseCurrentSession = () => {
  const { setSession, setStatus } = getClientSession();

  const retrieveSession = useCallback(async () => {
    try {
      setStatus("loading");
      const sessionData = await getSession();
      if (sessionData) {
        setSession(sessionData);
        setStatus("authenticated");
        return;
      }
      setStatus("unauthenticated");
      setSession(null);
    } catch (error) {
      setStatus("unauthenticated");
      setSession(null);
    }
  }, []);
  useEffect(() => {
    retrieveSession();
  }, []);
};
export default UseCurrentSession;
