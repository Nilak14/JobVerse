import LoginForm from "@/components/Forms/LoginForm";
import FormSide from "@/components/FormSide";
import AnimateWrapper from "@/components/Global/AnimateWrapper";
import BackButton from "@/components/Global/BackButton";
import Light from "@/components/Global/Light";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};
const LoginPage = () => {
  return (
    <main className="relative">
      <BackButton
        href="/"
        className="bg-black border border-gray-700 absolute top-10 left-10 z-10"
      />
      <Light className="hidden lg:block" />
      <section className="grid grid-cols-1 lg:grid-cols-2  h-dvh ">
        <article className="relative hidden lg:block">
          <AnimateWrapper reverse>
            <FormSide
              title="Continue Your Journey with JobVerse"
              description="Log in to explore new job opportunities or manage your hiring process with ease."
            />
          </AnimateWrapper>
        </article>
        <article className="bg-black grid  grid-cols-1  place-content-center">
          <AnimateWrapper>
            <LoginForm />
          </AnimateWrapper>
        </article>
      </section>
    </main>
  );
};
export default LoginPage;
