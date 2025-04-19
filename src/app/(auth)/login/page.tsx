import LoginForm from "@/components/Forms/LoginForm";
import FormSide from "@/components/FormSide";
import AnimateWrapper from "@/components/Global/AnimateWrapper";
import BackButton from "@/components/Global/BackButton";
import Light from "@/components/Global/Light";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Log in to JobVerse and explore new job opportunities or manage your hiring process with ease.",
};
const LoginPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { error } = await searchParams;

  return (
    <main className="relative">
      <BackButton
        href="/"
        className="bg-primary dark:bg-black dark:border hover:bg-primary/80 dark:border-gray-700 absolute text-white hover:dark:bg-black/80 top-10 left-10 z-10"
      />
      <Light className="invisible lg:visible" />
      <section className="grid grid-cols-1 lg:grid-cols-2  h-dvh ">
        <article className="relative hidden lg:block  ">
          <AnimateWrapper reverse>
            <FormSide
              title="Continue Your Journey with JobVerse"
              description="Log in to explore new job opportunities or manage your hiring process with ease."
            />
          </AnimateWrapper>
        </article>
        <article className="dark:bg-black bg-primary/30 grid  grid-cols-1  place-content-center">
          <AnimateWrapper>
            <LoginForm error={error as string} />
          </AnimateWrapper>
        </article>
      </section>
    </main>
  );
};
export default LoginPage;
