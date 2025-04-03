"use client";
import Image from "next/image";
import { Session } from "next-auth";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CallStatus, SavedMessage } from "@/lib/types";
import { toast } from "sonner";
import { vapi } from "@/lib/vapi";

interface AgentProps {
  session: Session;
  type: "generate" | "practice";
}

const Agent = ({ session, type }: AgentProps) => {
  const router = useRouter();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => setCallStatus(CallStatus.ENDED);
    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    };
    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);
    const onError = (error: Error) => {
      console.log(error);
      setCallStatus(CallStatus.ENDED);
      toast.error("An error occurred during the call. Please try again.");
    };
    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);
    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  useEffect(() => {
    if (callStatus === CallStatus.ENDED) {
      router.push("/job-seeker/career-coach/mock-interview");
    }
  }, [messages, callStatus, type, session.jobSeekerId]);

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);
    await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID, {
      variableValues: {
        userName: session.user.name,
        userId: session.jobSeekerId,
      },
    });
  };
  const handleDisconnect = async () => {
    setCallStatus(CallStatus.ENDED);
    vapi.stop();
  };

  const latestMessage = messages[messages.length - 1]?.content;

  const isCallInactiveOrEnded =
    callStatus === CallStatus.INACTIVE || callStatus === CallStatus.ENDED;

  return (
    <>
      <div className="grid grid-cols-2 gap-10 items-center justify-between w-full">
        <Card>
          <CardContent className="h-[350px] flex  border-2 rounded-lg flex-col bg-gradient-to-b from-[#171532] to-[#08090D] items-center justify-center">
            <div className="z-10 flex flex-col items-center justify-center  rounded-full size-[120px] relative">
              <Image
                src={"/avatar-placeholder.png"}
                alt="AI"
                width={65}
                height={54}
                className="object-cover w-full h-full rounded-full"
              />
              {isSpeaking && (
                <span className="absolute inline-flex size-5/6 animate-ping rounded-full bg-primary/80 opacity-75" />
              )}
            </div>
            <h3 className=" text-center text-primary-100 mt-5">
              AI Interviewer
            </h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="h-[350px] flex  border-2 rounded-lg flex-col bg-gradient-to-b from-[#171532] to-[#08090D] items-center justify-center">
            <div className="z-10 flex flex-col items-center justify-center  rounded-full size-[120px] relative">
              <Image
                src={
                  session.user.avatarUrl
                    ? session.user.avatarUrl
                    : "/avatar-placeholder.png"
                }
                alt="AI"
                width={65}
                height={54}
                className="object-cover w-full h-full rounded-full"
              />
            </div>
            <h3 className=" text-center text-primary-100 mt-5">
              {session.user.name || "You"}
            </h3>
          </CardContent>
        </Card>
      </div>
      {messages.length > 0 && (
        <div className="bg-gradient-to-b from-[#4B4D4F] to-[#4B4D4F33] p-0.5 rounded-2xl w-full mt-10">
          <div className=" bg-gradient-to-b from-[#1A1C20] to-[#08090D] rounded-2xl  min-h-12 px-5 py-3 flex items-center justify-center">
            <p
              key={latestMessage}
              className={cn(
                "transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100 text-lg text-center text-white"
              )}
            >
              {latestMessage}
            </p>
          </div>
        </div>
      )}

      <div className="w-full flex justify-center mt-10">
        {callStatus !== "ACTIVE" ? (
          <button
            className="relative inline-block px-7 py-3 font-bold text-sm leading-5 text-white transition-colors duration-150 bg-green-500 border border-transparent rounded-full shadow-sm focus:outline-none focus:shadow-2xl active:bg-success-200 hover:bg-green-600 min-w-28 cursor-pointer items-center justify-center overflow-visible"
            onClick={handleCall}
          >
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75 ",
                callStatus !== "CONNECTING" && "hidden"
              )}
            />

            <span className="relative  h-[85%] w-[65%]">
              {isCallInactiveOrEnded ? "Call" : ". . ."}
            </span>
          </button>
        ) : (
          <button
            className="inline-block px-7 py-3 text-sm font-bold leading-5 text-white transition-colors duration-150 bg-destructive border border-transparent rounded-full shadow-sm focus:outline-none focus:shadow-2xl active:bg-destructive-200 hover:bg-destructive min-w-28"
            onClick={handleDisconnect}
          >
            End
          </button>
        )}
      </div>
    </>
  );
};
export default Agent;
