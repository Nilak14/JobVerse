import CompanyRegisterForm from "@/components/Forms/CompanyRegisterForm";
import FormSide from "@/components/FormSide";
import AnimateWrapper from "@/components/Global/AnimateWrapper";

const CompanyRegisterPage = () => {
  return (
    <>
      <section className="bg-background flex-1 hidden lg:block relative ">
        <AnimateWrapper reverse>
          <FormSide
            title="Unlock Opportunities with JobVerse"
            description="Explore the benefits of JobVerse for advancing your career or finding top talent effortlessly."
          />
        </AnimateWrapper>
      </section>
      <section className="bg-black min-h-full h-fit flex-1">
        <AnimateWrapper className="relative">
          <CompanyRegisterForm />
        </AnimateWrapper>
      </section>
    </>
  );
};
export default CompanyRegisterPage;
