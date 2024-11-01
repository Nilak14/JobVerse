import BackButton from "@/components/Global/BackButton";
import Light from "@/components/Global/Light";
import GridPattern from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}
const RegisterLayout = ({ children }: LayoutProps) => {
  return (
    <main className="relative">
      <BackButton
        href="/"
        className="bg-black border border-gray-700 absolute top-4 left-5 lg:top-10 lg:left-10 z-20"
      />
      <Light className="hidden lg:block z-10 " />
      <section className="grid grid-cols-1 lg:grid-cols-2  h-dvh ">
        {children}
      </section>
    </main>
  );
};
export default RegisterLayout;
