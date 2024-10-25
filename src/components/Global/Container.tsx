import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}
const Container = ({ children, className }: Props) => {
  return (
    <section
      className={cn(
        "h-full mx-auto w-full max-w-full  px-4 md:px-12 lg:px-24",
        className
      )}
    >
      {children}
    </section>
  );
};
export default Container;
