import { FileUser, MailCheck, UserSearch } from "lucide-react";
import OrbitingCircles from "./ui/orbiting-circles";
import Image from "next/image";
import Ripple from "./ui/ripple";

interface FormSideProps {
  title: string;
  description: string;
}
const FormSide = ({ description, title }: FormSideProps) => {
  return (
    <div className=" h-full flex justify-center items-center">
      <Ripple mainCircleSize={500} />
      <OrbitingCircles
        className="size-[50px] border-none bg-transparent"
        duration={20}
        delay={20}
        radius={80}
      >
        <UserSearch size={80} className="fill-primary text-primary" />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[50px] border-none bg-transparent"
        duration={20}
        delay={10}
        radius={80}
      >
        <Image
          alt="logo"
          height={100}
          width={100}
          className="rounded-full"
          src={"/logo/jobverse_bg.svg"}
        />
      </OrbitingCircles>

      <OrbitingCircles
        className="size-[100px] border-none bg-transparent"
        radius={190}
        duration={20}
        reverse
      >
        <FileUser size={80} className="fill-primary text-white" />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[100px] border-none bg-none"
        radius={190}
        duration={20}
        delay={20}
        reverse
      >
        <MailCheck size={80} className="fill-primary text-white" />
      </OrbitingCircles>

      <div className="absolute flex flex-col items-center bottom-[15%] text-center backdrop-blur-md bg-background/40">
        <h2 className="text-2xl font-bold tracking-wide text-primary">
          {title}
        </h2>
        <p className="text-muted-foreground mt-4 w-2/3">{description}</p>
      </div>
    </div>
  );
};
export default FormSide;
