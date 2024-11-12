"use client";
import { ThreeDots } from "react-loader-spinner";
import CardWrapper from "../Global/CardWrapper";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { emailVerification } from "@/actions/auth/emailVerification";
type props = {
  token: string;
};
const EmailVerificationForm = ({ token }: props) => {
  const router = useRouter();
  const verifyEmail = useCallback(async () => {
    if (!token) {
      toast.error("Token is Missing", { id: "email-verification" });
      router.push("/login");
    }
    const { error, success } = await emailVerification(token);
    if (success) {
      toast.success(success, { id: "email-verification" });
      router.push("/login");
    } else if (error) {
      toast.error(error, { id: "email-verification" });
      router.push("/login");
    } else {
      toast.error("Something went wrong, Please Try Again", {
        id: "email-verification",
      });
      router.push("/login");
    }
  }, [token]);

  useEffect(() => {
    verifyEmail();
  }, [verifyEmail]);

  return (
    <CardWrapper
      backButtonHref="/login"
      backButtonLabel="Back To Login"
      headerLabel="Verifying your Email"
    >
      <div className="flex items-center w-full justify-center">
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#e9590c"
          radius="9"
        />
      </div>
    </CardWrapper>
  );
};

export default EmailVerificationForm;
