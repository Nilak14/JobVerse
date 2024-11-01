import CompanyRegisterForm from "@/components/Forms/CompanyRegisterForm";
import FormSide from "@/components/FormSide";
import AnimateWrapper from "@/components/Global/AnimateWrapper";

const CompanyRegisterPage = () => {
  return (
    <>
      <article className="relative h-[700px] hidden lg:block ">
        <AnimateWrapper reverse>
          <FormSide
            title="Unlock Opportunities with JobVerse"
            description="Explore the benefits of JobVerse for advancing your career or finding top talent effortlessly."
          />
        </AnimateWrapper>
      </article>
      <article className="bg-black grid  grid-cols-1  place-content-center">
        <AnimateWrapper className="relative">
          <CompanyRegisterForm />
        </AnimateWrapper>
      </article>
    </>
  );
};
export default CompanyRegisterPage;
