import JobSeekerRegisterForm from "@/components/Forms/JobSeekerRegisterForm";
import FormSide from "@/components/FormSide";
import AnimateWrapper from "@/components/Global/AnimateWrapper";

const JobSeekerRegisterPage = () => {
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
      <article className="dark:bg-black bg-primary/30 grid  grid-cols-1  place-content-center">
        <AnimateWrapper className="relative">
          <JobSeekerRegisterForm />
        </AnimateWrapper>
      </article>
    </>
  );
};
export default JobSeekerRegisterPage;
