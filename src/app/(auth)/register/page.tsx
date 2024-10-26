import RegisterForm from "@/components/Forms/RegisterForm";
import FormSide from "@/components/FormSide";
import AnimateWrapper from "@/components/Global/AnimateWrapper";
import BackButton from "@/components/Global/BackButton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
};
const RegisterPage = () => {
  return (
    <main className="relative">
      <div className="absolute top-4 left-4 z-10 lg:top-[7%] lg:left-7">
        <BackButton className="bg-black border border-gray-700" />
      </div>
      <div className="flex h-screen ">
        <section className="bg-background flex-1 hidden lg:block relative ">
          <AnimateWrapper reverse>
            <FormSide
              title="Unlock Opportunities with JobVerse"
              description="Explore the benefits of JobVerse for advancing your career or finding top talent effortlessly."
            />
          </AnimateWrapper>
        </section>
        <section className="bg-black min-h-full h-fit flex-1">
          <AnimateWrapper>
            <RegisterForm />
          </AnimateWrapper>
        </section>
      </div>
    </main>
  );
};
export default RegisterPage;
