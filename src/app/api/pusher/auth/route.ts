import { auth } from "@/lib/auth";
import { getPusherInstance } from "@/lib/pusher/server";
import { NextRequest } from "next/server";

const pusherServer = getPusherInstance();

export const POST = async (req: NextRequest) => {
  const session = await auth();

  if (!session || !session.user) {
    return new Response("Unauthorized", { status: 401 });
  }
  if (session.user.isBlocked) {
    return new Response("Unauthorized", { status: 403 });
  }

  if (!session.user.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const data = await req.text();
  const [socketId, channelName] = data
    .split("&")
    .map((str) => str.split("=")[1]);

  const authRes = pusherServer.authorizeChannel(socketId, channelName);

  return new Response(JSON.stringify(authRes));
};
