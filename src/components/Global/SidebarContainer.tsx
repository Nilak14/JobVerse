import { cn } from "@/lib/utils";

interface SidebarContainerProps {
  children: React.ReactNode;
  className?: string;
}
const SidebarContainer = ({ children, className }: SidebarContainerProps) => {
  return (
    <section
      className={cn("h-full mx-auto w-full max-w-full  px-4 pb-7", className)}
    >
      {children}
    </section>
  );
};
export default SidebarContainer;
