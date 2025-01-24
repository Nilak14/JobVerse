import BackButton from "@/components/Global/BackButton";
import Light from "@/components/Global/Light";
import { Metadata } from "next";

interface LayoutProps {
  children: React.ReactNode;
}
export const metadata: Metadata = {
  title: "Register",
  description:
    "Register to JobVerse and explore new job opportunities or manage your hiring process with ease.",
};
const RegisterLayout = ({ children }: LayoutProps) => {
  return (
    <main className="relative">
      <BackButton
        href="/"
        className=" bg-primary dark:bg-black dark:border hover:bg-primary/80 dark:border-gray-700 absolute text-white hover:dark:bg-black/80 top-4 left-5 lg:top-10 lg:left-10 z-20"
      />
      <Light className="invisible lg:visible z-10 " />
      <section className="grid grid-cols-1 lg:grid-cols-2  h-dvh ">
        {children}
      </section>
    </main>
  );
};
export default RegisterLayout;
