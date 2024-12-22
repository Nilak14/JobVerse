import { Button } from "./button";

interface LinkButtonAnimatedProps {
  children?: React.ReactNode;
}

const LinkButtonAnimated = ({ children }: LinkButtonAnimatedProps) => {
  return (
    <div>
      <button className="group relative text-sm text-primary font-medium active:scale-95">
        {children}
        <div className="bg-primary w-0  h-[1.5px] group-hover:w-full transition-all duration-300 ease-in-out  block absolute right-0 "></div>
      </button>
    </div>
  );
};
export default LinkButtonAnimated;
