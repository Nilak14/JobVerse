"use client";
import Image from "next/image";
import { Session } from "next-auth";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { TransitionStartFunction, useEffect, useState } from "react";
import { CallStatus, SavedMessage } from "@/lib/types";
import { toast } from "sonner";
import { vapi } from "@/lib/vapi";
import { interviewer } from "@/lib/data";
import { createFeedback } from "@/actions/mock-interview/createFeedback";
import { Button } from "../ui/button";
import { Mic, Phone, PhoneOff } from "lucide-react";

interface AgentProps {
  session: Session;
  type: "generate" | "practice";
  interviewId?: string;
  questions?: string[];
  startTransition?: TransitionStartFunction;
}

const Agent = ({
  session,
  type,
  interviewId,
  questions,
  startTransition,
}: AgentProps) => {
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
      console.log("Error:", error);
      console.log(error);
      setCallStatus(CallStatus.ENDED);
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

  const handleGenerateFeedback = async (messages: SavedMessage[]) => {
    if (!interviewId) {
      toast.error("Interview ID is required to generate feedback.");
      return;
    }
    if (!startTransition) {
      return;
    }
    startTransition(async () => {
      try {
        const { success, data, message } = await createFeedback({
          interviewId: interviewId!,
          userId: session.jobSeekerId!,
          transcript: messages,
        });
        if (success && data?.feedbackId) {
          router.push(`/job-seeker/take-interview/${interviewId}/feedback`);
        } else {
          toast.error(
            message || "Failed to generate feedback. Please try again."
          );
          router.push("/job-seeker/career-coach/mock-interview");
        }
      } catch (error) {
        toast.error("Failed to generate feedback. Please try again.");
        router.push("/job-seeker/career-coach/mock-interview");
      }
    });
  };

  useEffect(() => {
    if (callStatus === CallStatus.ENDED) {
      if (type === "generate") {
        router.push("/job-seeker/career-coach/mock-interview");
      } else {
        console.log("ended");
        handleGenerateFeedback(messages);
      }
    }
  }, [messages, callStatus, type, session.jobSeekerId]);

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);
    if (type === "generate") {
      await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID, {
        variableValues: {
          userName: session.user.name,
          userId: session.jobSeekerId,
        },
      });
    } else {
      let formattedQuestions = "";
      if (questions) {
        formattedQuestions = questions
          .map((question) => `- ${question}`)
          .join("\n");
      }
      await vapi.start(interviewer, {
        variableValues: {
          questions: formattedQuestions,
        },
      });
    }
  };
  const handleDisconnect = async () => {
    setCallStatus(CallStatus.ENDED);
    vapi.stop();
  };

  const latestMessage = messages[messages.length - 1]?.content;

  const isCallInactiveOrEnded =
    callStatus === CallStatus.INACTIVE || callStatus === CallStatus.ENDED;

  return (
    <div className="w-full  mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center justify-between w-full">
        <Card className="border-2 border-orange-200/20 dark:border-orange-900/20 shadow-lg overflow-hidden">
          <CardContent className="p-0">
            <div className="h-[350px] flex flex-col bg-gradient-to-b from-orange-50 to-orange-100 dark:from-orange-950/40 dark:to-orange-900/20 items-center justify-center relative">
              <div className="z-10 flex flex-col items-center justify-center">
                <div className="relative">
                  <div className="rounded-full size-[120px] bg-orange-100 dark:bg-orange-900/30 p-1 border-2 border-orange-700">
                    <Image
                      src="/Interviewer.png"
                      alt="AI"
                      width={200}
                      height={200}
                      className="object-cover w-full h-full rounded-full"
                    />
                  </div>
                  {isSpeaking && (
                    <span className="absolute inset-0 inline-flex size-full animate-ping rounded-full bg-orange-400/40 dark:bg-orange-500/40 opacity-75" />
                  )}
                  {isSpeaking && (
                    <div className="absolute -bottom-2 right-0 bg-orange-500 dark:bg-orange-600 text-white p-1.5 rounded-full">
                      <Mic className="h-4 w-4" />
                    </div>
                  )}
                </div>
                <h3 className="text-center font-semibold text-orange-950 dark:text-orange-100 mt-5">
                  AI Interviewer
                </h3>
                <p className="text-xs text-orange-700 dark:text-orange-300 mt-1">
                  {isSpeaking && "Speaking..."}
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-orange-200/20 dark:from-orange-800/20 to-transparent" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-orange-200/20 dark:border-orange-900/20 shadow-lg overflow-hidden">
          <CardContent className="p-0">
            <div className="h-[350px] flex flex-col bg-gradient-to-b from-orange-50 to-orange-100 dark:from-orange-950/40 dark:to-orange-900/20 items-center justify-center relative">
              <div className="z-10 flex flex-col items-center justify-center">
                <div className="rounded-full size-[120px] bg-orange-100 dark:bg-orange-900/30 p-1 border-2 border-orange-200 dark:border-orange-700">
                  <Image
                    src={
                      session.user.avatarUrl
                        ? session.user.avatarUrl
                        : "/avatar-placeholder.png"
                    }
                    alt={session.user.name || "You"}
                    width={200}
                    height={200}
                    className="object-cover w-full h-full rounded-full"
                  />
                </div>
                <h3 className="text-center font-semibold text-orange-950 dark:text-orange-100 mt-5">
                  {session.user.name || "You"}
                </h3>
                <p className="text-xs text-orange-700 dark:text-orange-300 mt-1">
                  {callStatus === CallStatus.ACTIVE ? "In call" : "Ready"}
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-orange-200/20 dark:from-orange-800/20 to-transparent" />
            </div>
          </CardContent>
        </Card>
      </div>

      {messages.length > 0 && (
        <div className="mt-10 w-full">
          <Card className="border-2 border-orange-200/20 dark:border-orange-900/20 shadow-lg overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-orange-50 via-orange-100/50 to-orange-50 dark:from-orange-950/40 dark:via-orange-900/30 dark:to-orange-950/40 p-6 min-h-[80px] flex items-center justify-center">
                <p
                  key={latestMessage}
                  className={cn(
                    "transition-opacity duration-500 opacity-0",
                    "animate-fadeIn opacity-100 text-lg text-center text-orange-950 dark:text-orange-100"
                  )}
                >
                  {latestMessage}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="w-full flex justify-center mt-10 mb-6">
        {callStatus !== CallStatus.ACTIVE ? (
          <Button
            onClick={handleCall}
            size="lg"
            className="relative px-8 py-6 font-semibold text-white bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 rounded-full shadow-lg transition-all duration-200 min-w-36"
            disabled={callStatus === CallStatus.CONNECTING}
          >
            {callStatus === CallStatus.CONNECTING && (
              <span className="absolute inset-0 animate-ping rounded-full bg-orange-400/40 dark:bg-orange-500/40 opacity-75" />
            )}
            <Phone className="mr-2 h-5 w-5" />
            <span>
              {isCallInactiveOrEnded ? "Start Call" : "Connecting..."}
            </span>
          </Button>
        ) : (
          <Button
            onClick={handleDisconnect}
            size="lg"
            variant="destructive"
            className="px-8 py-6 font-semibold rounded-full shadow-lg transition-all duration-200 min-w-36"
          >
            <PhoneOff className="mr-2 h-5 w-5" />
            <span>End Call</span>
          </Button>
        )}
      </div>
    </div>
  );
};
export default Agent;
