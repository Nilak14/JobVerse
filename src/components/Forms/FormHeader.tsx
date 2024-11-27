interface FormHeaderProps {
  headingText: string;
  supportingText?: string;
}
const FormHeader = ({ headingText, supportingText }: FormHeaderProps) => {
  return (
    <>
      <h1 className="text-xl sm:text-2xl font-bold tracking-wide ">
        {headingText}
      </h1>
      {supportingText && (
        <p className=" text-sm sm:text-base text-gray-700 dark:text-muted-foreground font-medium tracking-wide text-pretty">
          {supportingText}
        </p>
      )}
    </>
  );
};
export default FormHeader;
