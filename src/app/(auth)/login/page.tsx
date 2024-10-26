import LoginForm from "@/components/Forms/LoginForm";
import RegisterForm from "@/components/Forms/RegisterForm";
import FormSide from "@/components/FormSide";
import AnimateWrapper from "@/components/Global/AnimateWrapper";
import BackButton from "@/components/Global/BackButton";

const LoginPage = () => {
  return (
    <main className="relative">
      <div className="absolute top-4 left-4 z-10 lg:top-[7%] lg:left-7">
        <BackButton className="bg-black border border-gray-700" />
      </div>
      <div className="flex h-screen ">
        <section className="bg-background flex-1 hidden lg:block relative ">
          <AnimateWrapper reverse>
            <FormSide
              title="Continue Your Journey with JobVerse"
              description="Log in to explore new job opportunities or manage your hiring process with ease."
            />
          </AnimateWrapper>
        </section>
        <section className="bg-black min-h-full h-fit flex-1">
          <AnimateWrapper>
            <LoginForm />
          </AnimateWrapper>
        </section>
      </div>
    </main>
  );
};
export default LoginPage;
