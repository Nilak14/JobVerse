import { useState, useEffect, RefObject } from "react";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "@/components/ui/responsive-dailog";
import LoadingButton from "../ui/loading-button";
import { UseFormReturn } from "react-hook-form";
import { LoginSchemaType } from "@/schema/LoginSchema";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Button } from "../ui/button";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { sendTwoFactorCode } from "@/actions/auth/sendTwoFactorCode";
import { toast } from "sonner";

interface TwoFactorModalModelProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  userEmail: string;
  form: UseFormReturn<LoginSchemaType>;
  loading: boolean;
  ref: RefObject<HTMLButtonElement | null>;
}

const TwoFactorModal = ({
  open,
  setOpen,
  userEmail,
  form,
  ref,
  loading,
}: TwoFactorModalModelProps) => {
  const [timer, setTimer] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setIsResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timer]);

  const handleResendCode = async () => {
    const res = await sendTwoFactorCode(userEmail);
    if (res.error) {
      toast.error(res.error);
      return;
    } else {
      toast.success("Two Factor Code Sent, Please Check Your Email");
      setIsResendDisabled(true);
      setTimer(60);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <ResponsiveModal open={open} onOpenChange={setOpen}>
      <ResponsiveModalContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        className="overflow-hidden"
      >
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>
            Enter Your Two Step Verification Code
          </ResponsiveModalTitle>
          <ResponsiveModalDescription className="sr-only">
            Enter Your Two Step Verification Code
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem className="flex items-center justify-center flex-col space-y-4">
              <FormLabel className="sr-only">
                Two Step Verification Code
              </FormLabel>
              <FormControl>
                <InputOTP pattern={REGEXP_ONLY_DIGITS} maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the OTP sent to your email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-4 md:mt-0 md:gap-5">
          <Button
            onClick={() => {
              setOpen(false);
            }}
            variant={"secondary"}
            className="flex-1 w-full"
          >
            Cancel
          </Button>
          <LoadingButton
            onClick={() => {
              ref.current?.click();
            }}
            showIconOnly
            type="button"
            className="flex-1 w-full m-auto"
            loading={loading}
          >
            Confirm
          </LoadingButton>
        </div>
        <ResponsiveModalFooter className="w-full">
          <p className="text-center text-xs mt-2 w-full">
            Did not receive the code?
            <button
              type="button"
              onClick={handleResendCode}
              disabled={isResendDisabled}
              className={`ml-1 hover:underline cursor-pointer text-primary font-semibold ${
                isResendDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Send Again
            </button>
            {timer > 0 && <span className="ml-4">{formatTime(timer)}</span>}
          </p>
        </ResponsiveModalFooter>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};

export default TwoFactorModal;
