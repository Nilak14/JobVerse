import { cn } from "@/lib/utils";

interface LightProps {
  className?: string;
}
const Light = ({ className }: LightProps) => {
  return (
    <div
      className={cn(
        "bg-primary hidden dark:block w-56 absolute  md:w-64 aspect-square blur-[10rem] ",
        className
      )}
    ></div>
  );
};
export default Light;
